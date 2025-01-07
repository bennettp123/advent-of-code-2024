import {
    type Board,
    Direction,
    type Position,
} from '@advent-of-code-2024/utils'

export class Actor {
    position: Position
    direction: Direction
    totalSteps = 0
    positionsVisited: { pos: Position; directions: Direction[] }[]
    constructor(public readonly board: Board) {
        let column = -1
        let direction: Direction | undefined = undefined
        const row = this.board.rows.findIndex(row => {
            const columns = row.split('')
            column = columns.findIndex(column => {
                if (column === '^') {
                    direction = Direction.UP
                    return true
                }
                if (column === '>') {
                    direction = Direction.RIGHT
                    return true
                }
                if (column === '<') {
                    direction = Direction.LEFT
                    return true
                }
                if (column === 'v') {
                    direction = Direction.DOWN
                    return true
                }
                return false
            })
            if (column !== -1) {
                return true
            }
            return false
        })

        if (row === -1 || column === -1) {
            throw new Error('position not found!')
        }

        if (direction === undefined) {
            throw new Error('direction could not be determined!')
        }

        this.position = { row, column }
        this.positionsVisited = [
            { pos: this.position, directions: [this.direction] },
        ]
        this.direction = direction
    }

    /**
     * instruct the actor to walk, stopping just before it leaves the board,
     * or after maxSteps, whichever occurs first
     * @returns the number of steps walked
     */
    walk(
        maxSteps = 100,
        callback?: (actor: Actor, previous: { pos: Position }) => boolean,
    ): {
        reasonForStopping:
            | 'MAX_STEPS'
            | 'STUCK_IN_LOOP'
            | 'OFF_BOARD'
            | 'CALLBACK'
    } {
        let steps = 0
        while (true) {
            const reasonForStopping = this.stepOnce(callback).reasonForStopping
            if (reasonForStopping !== undefined) {
                return { reasonForStopping }
            }

            steps = steps + 1
            if (steps >= maxSteps) {
                return { reasonForStopping: 'MAX_STEPS' }
            }
        }
    }

    /**
     * Instruct the actor to take one step, updating its position and
     * direction according to any obstacles in its path.
     *
     * @returns true if successful, or false if it would walk off the map.
     */
    step(): boolean {
        return !(this.stepOnce().reasonForStopping === 'OFF_BOARD')
    }

    /**
     * same as step(), but calls callback just before actually moving
     */
    stepOnce(callback?: (actor: Actor, next: { pos: Position }) => boolean): {
        reasonForStopping?:
            | 'OFF_BOARD'
            | 'CALLBACK'
            | 'STUCK_IN_LOOP'
            | undefined
    } {
        let { row, column } = this.position
        switch (this.direction) {
            case Direction.UP:
                row = row - 1
                break
            case Direction.DOWN:
                row = row + 1
                break
            case Direction.LEFT:
                column = column - 1
                break
            case Direction.RIGHT:
                column = column + 1
                break
            default:
                throw new Error(`unhandled direction: ${this.direction}`)
        }

        const nextPos = { row, column }

        if (!this.board.isInBounds(nextPos)) {
            return { reasonForStopping: 'OFF_BOARD' }
        }

        if (this.board.get(nextPos) === '#') {
            this.turnRight()
            return this.stepOnce(callback)
        }

        if (callback?.(this, { pos: nextPos })) {
            return { reasonForStopping: 'CALLBACK' }
        }

        if (this.hasVisited(nextPos, this.direction)) {
            return { reasonForStopping: 'STUCK_IN_LOOP' }
        }

        this.position = nextPos
        this.totalSteps = this.totalSteps + 1
        this.recordPosition()

        return { reasonForStopping: undefined }
    }

    /**
     * turns 90 degrees to the right, updating its direction accordingly
     */
    turnRight() {
        switch (this.direction) {
            case Direction.UP:
                this.direction = Direction.RIGHT
                return
            case Direction.DOWN:
                this.direction = Direction.LEFT
                return
            case Direction.LEFT:
                this.direction = Direction.UP
                return
            case Direction.RIGHT:
                this.direction = Direction.DOWN
                return
            default:
                throw new Error(`unhandled direction: ${this.direction}`)
        }
    }

    hasVisited(pos: Position, direction?: Direction): boolean {
        return this.positionsVisited.some(
            visited =>
                pos.column === visited.pos.column &&
                pos.row === visited.pos.row &&
                (direction !== undefined
                    ? visited.directions.includes(direction)
                    : true),
        )
    }

    recordPosition() {
        if (this.hasVisited(this.position)) {
            const index = this.positionsVisited.findIndex(
                position =>
                    position.pos.column === this.position.column &&
                    position.pos.row === this.position.row,
            )
            this.positionsVisited[index] = {
                pos: this.positionsVisited[index].pos,
                directions: [
                    ...new Set([
                        ...this.positionsVisited[index].directions,
                        this.direction,
                    ]),
                ],
            }
        } else {
            this.positionsVisited = [
                ...this.positionsVisited,
                { pos: this.position, directions: [this.direction] },
            ]
        }
    }
}
