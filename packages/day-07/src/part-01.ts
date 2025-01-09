import { sequence } from '@advent-of-code-2024/utils'

const operators = [
    (a: number, b: number) => a + b,
    (a: number, b: number) => a * b,
]

export function canSolve(desiredResult: number, ...numbers: number[]) {
    for (const num of sequence(2 ** numbers.length)) {
        const ops = [...getBitsForNumber(num, numbers.length - 1)].map(
            bit => operators[bit],
        )
        const result = trySolve(numbers, ops)
        if (result === desiredResult) {
            return true
        }
    }
}

export function* getBitsForNumber(num: number, bits: number) {
    for (const i of sequence(bits)) {
        yield (num >> i) & 1
    }
}

export function trySolve(
    numbers: number[],
    operators: ((a: number, b: number) => number)[],
) {
    let result = numbers[0]
    for (let i = 0; i < operators.length; i++) {
        result = operators[i](result, numbers[i + 1])
    }
    return result
}
