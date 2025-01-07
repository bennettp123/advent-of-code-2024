import { readInput } from '@advent-of-code-2024/utils'
import {
    Direction,
    countXMAS,
    getBoardDimensions,
    getDiagonal,
    sequence,
} from './src/word-search-utils'

const xmas = 'XMAS'
const maxLength = xmas.length

const directions = [
    Direction.DOWN,
    Direction.DOWN_LEFT,
    Direction.DOWN_RIGHT,
    Direction.LEFT,
    Direction.RIGHT,
    Direction.UP,
    Direction.UP_LEFT,
    Direction.UP_RIGHT,
]

const board = await readInput('input.txt')

const computePartOne = false
const computePartTwo = true

if (computePartOne) {
    const { width, height } = getBoardDimensions(board)

    let count = 0
    for (const row of sequence(height)) {
        for (const column of sequence(width)) {
            const pos = { row, column }
            for (const direction of directions) {
                if (
                    getDiagonal({
                        board,
                        start: pos,
                        direction,
                        maxLength,
                    }) === xmas
                ) {
                    count = count + 1
                }
            }
        }
    }
    console.info(`part 1: found ${count} instances of ${xmas}`)
} else {
    console.info('part 1: skipped!')
}

if (computePartTwo) {
    const xmasCount = countXMAS({ board })
    console.info(`part 2: found ${xmasCount} instances of X-MAS`)
} else {
    console.info('part 2: skipped!')
}
