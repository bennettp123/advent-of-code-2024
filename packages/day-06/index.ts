import {
    Board,
    Direction,
    MutableBoard,
    type Position,
    readInput,
} from '@advent-of-code-2024/utils'
import { Actor } from './src/actor'
const input = await readInput('input.txt')
const board = new Board(input)
const actor = new Actor(board)

let newObstaclesToCreateLoops: Position[] = []

const newObstaclesToCreateLoopsEvenWithoutTurningRight: Set<string> = new Set()

const initialPos = { row: actor.position.row, column: actor.position.column }
const isInitialPos = (pos: Position) =>
    pos.row === initialPos.row && pos.column === initialPos.column

actor.walk(Number.MAX_SAFE_INTEGER, (actor, next) => {
    if (actor.hasVisited(next.pos)) {
        if (!isInitialPos(next.pos)) {
            newObstaclesToCreateLoopsEvenWithoutTurningRight.add(
                `${next.pos.row},${next.pos.column}`,
            )
        }

        // possible loop at next position!
        const visited = actor.positionsVisited.find(
            ({ pos }) =>
                pos.row === next.pos.row && pos.column === next.pos.column,
        )

        if (visited === undefined) {
            throw new Error('unreachable')
        }

        const { directions } = visited

        const nextDirection = actor.direction
        let directionAfterTurningRight: Direction
        const possiblePositionOfObstacle: Position = {
            row: next.pos.row,
            column: next.pos.column,
        }

        switch (nextDirection) {
            case Direction.UP:
                directionAfterTurningRight = Direction.RIGHT
                possiblePositionOfObstacle.row =
                    possiblePositionOfObstacle.row - 1
                break
            case Direction.RIGHT:
                directionAfterTurningRight = Direction.DOWN
                possiblePositionOfObstacle.column =
                    possiblePositionOfObstacle.column + 1
                break
            case Direction.DOWN:
                directionAfterTurningRight = Direction.LEFT
                possiblePositionOfObstacle.row =
                    possiblePositionOfObstacle.row + 1
                break
            case Direction.LEFT:
                directionAfterTurningRight = Direction.UP
                possiblePositionOfObstacle.column =
                    possiblePositionOfObstacle.column - 1
                break
            default:
                throw new Error(`unrecognized direction ${nextDirection}`)
        }

        if (directions.includes(directionAfterTurningRight)) {
            // LOOP detected!!!!!
            newObstaclesToCreateLoops = [
                ...newObstaclesToCreateLoops,
                possiblePositionOfObstacle,
            ]
        }
    }
    return false
})

const bruteForcedExtraObstacles = new Set<string>()
for (let idx = 0; idx < actor.positionsVisited.length; idx++) {
    const pos = actor.positionsVisited[idx].pos
    if (!isInitialPos(pos)) {
        console.debug(
            `brute-forcing ${JSON.stringify(pos)} (${idx}/${actor.positionsVisited.length}) (${Math.floor((idx * 100) / actor.positionsVisited.length)}%)...`,
        )
        const newBoard = MutableBoard.from(board)
        newBoard.set(pos, '#')
        const newActor = new Actor(newBoard)
        if (
            newActor.walk(Number.MAX_SAFE_INTEGER).reasonForStopping ===
            'STUCK_IN_LOOP'
        ) {
            bruteForcedExtraObstacles.add(`${pos.row},${pos.column}`)
            console.debug(
                `found infinite loop at ${JSON.stringify(pos)}! (total: ${[...bruteForcedExtraObstacles].length})`,
            )
        }
    }
}

console.info(
    `part 1: visited ${actor.positionsVisited.length} unique positions`,
)

console.info(
    `part 2: there are ${newObstaclesToCreateLoops.length} positions that would create an infinite loop`,
)

console.info(
    `part 2: there are ${[...newObstaclesToCreateLoopsEvenWithoutTurningRight].length} positions that would create an infinite loop but would not require a right-hand turn to do so, producing the incorrect result`,
)

console.info(
    `part 2: there are ${[...bruteForcedExtraObstacles].length} positions that would create an infinite loop, as calculating by brute-forcing all visited positions on the path`,
)
