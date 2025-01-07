import { readInput } from '@advent-of-code-2024/utils'
import { parse } from './src/parse'
import { getMiddleCorrectUpdates } from './src/part-1'
import { getIncorrectUpdates } from './src/part-2'
const input = await readInput('input.txt')
const { rules, updates } = parse(input)
const middleCorrectUpdates = getMiddleCorrectUpdates({ rules, updates })

console.info(
    `part 1: sum of middle page of correct updates: ${middleCorrectUpdates}`,
)

const incorrectUpdates = getIncorrectUpdates({ rules, updates })
const correctedUpdates = incorrectUpdates.map(update => update.fix(rules))
const sumMiddle = correctedUpdates
    .map(update => Number(update.middle))
    .reduce((acc, cur) => acc + cur, 0)

console.info(
    `part 2: sum of middle page of incorrect updates: ${sumMiddle} (after fixing them)`,
)
