import fs from 'node:fs/promises'

import { parseInput } from './parse-input.mjs'
import { getSum } from './get-sum.mjs'
import { getSimilarityScore } from './get-similarity-score.mjs'

const input = Buffer.from(
    await fs.readFile(new URL('./input.txt', import.meta.url))
).toString('utf8')

const lines = input.split('\n').filter(Boolean)
const [first, second] = parseInput(input)

const sum = getSum(first, second)
console.log({ sum })

const similarity = getSimilarityScore(first, second)
console.log({ similarity })
