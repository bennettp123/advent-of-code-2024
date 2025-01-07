import { readInput } from '@advent-of-code-2024/utils'
import { parse } from './src/parse'
import { getMiddleCorrectUpdates } from './src/part-1'
const input = await readInput('input.txt')
const { rules, updates } = parse(input)
const middleCorrectUpdates = getMiddleCorrectUpdates({ rules, updates })

console.info(
    `part 1: sum of middle page of correct updates: ${middleCorrectUpdates}`,
)
