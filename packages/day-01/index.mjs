import fs from 'node:fs/promises'
import { getSimilarityScore } from './get-similarity-score.mjs'
import { getSum } from './get-sum.mjs'
import { parseInput } from './parse-input.mjs'

const input = Buffer.from(
    await fs.readFile(new URL('./input.txt', import.meta.url)),
).toString('utf8')

const [first, second] = parseInput(input)

// part 1
const sum = getSum(first, second)
console.log({ sum, note: 'part 1' })

// part 2
const similarity = getSimilarityScore(first, second)
console.log({ similarity, note: 'part 2' })
