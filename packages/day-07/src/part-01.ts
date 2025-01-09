import { sequence } from '@advent-of-code-2024/utils'
import { getOperatorIndexesForNumber, trySolve } from './helpers'

const operators = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b,
]

export function canSolve(desiredResult: number, ...numbers: number[]) {
    for (const num of sequence(2 ** numbers.length)) {
        const ops = [
            ...getOperatorIndexesForNumber(num, numbers.length - 1),
        ].map(bit => operators[bit])
        const result = trySolve(numbers, ops)
        if (result === desiredResult) {
            return true
        }
    }
}
