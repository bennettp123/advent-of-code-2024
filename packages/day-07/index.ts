import { readInput } from '@advent-of-code-2024/utils'
import { canSolve } from './src/part-01'
const input = await readInput('input.txt')

const solvable = input.split('\n').filter(line => {
    if (!line) {
        return false
    }
    try {
        const desiredResult = Number(line.split(':')[0])
        const numbers = line.split(':')[1].trim().split(' ').map(Number)
        if (canSolve(desiredResult, ...numbers)) {
            return true
        }
    } catch (e) {
        console.log(e)
    }
})

const sum = solvable.reduce((acc, line) => acc + Number(line.split(':')[0]), 0)

console.info(`part 1: ${sum}`)
