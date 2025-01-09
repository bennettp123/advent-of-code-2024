import { readInput } from '@advent-of-code-2024/utils'
import * as part1 from './src/part-01'
import * as part2 from './src/part-02'
const input = await readInput('input.txt')

const part1solvable = input.split('\n').filter(line => {
    if (!line) {
        return false
    }
    try {
        const desiredResult = Number(line.split(':')[0])
        const numbers = line.split(':')[1].trim().split(' ').map(Number)
        if (part1.canSolve(desiredResult, ...numbers)) {
            return true
        }
    } catch (e) {
        console.log(e)
    }
})

const part1sum = part1solvable.reduce(
    (acc, line) => acc + Number(line.split(':')[0]),
    0,
)

console.info(`part 1: ${part1sum}`)

const part2solvable = input.split('\n').filter(line => {
    if (!line) {
        return false
    }
    try {
        const desiredResult = Number(line.split(':')[0])
        const numbers = line.split(':')[1].trim().split(' ').map(Number)
        if (part2.canSolve(desiredResult, ...numbers)) {
            return true
        }
    } catch (e) {
        console.log(e)
    }
})

const part2sum = part2solvable.reduce(
    (acc, line) => acc + Number(line.split(':')[0]),
    0,
)

console.info(`part 2: ${part2sum}`)
