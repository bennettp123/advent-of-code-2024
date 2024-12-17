import fs from 'node:fs/promises'
import { getSum } from './get-sum.mjs'

const input = Buffer.from(await fs.readFile(new URL('./input.txt', import.meta.url))).toString('utf8')
const lines = input.split('\n').filter(Boolean)

const [first, second] = lines.reduce(([firstAcc, secondAcc], line) => {
    const [first, second] = line.split(/\s+/).map(Number)
    return [[...firstAcc, first], [...secondAcc, second]]
}, [[], []])

const sum = getSum(first, second)

console.log(sum)
