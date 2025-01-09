import { sequence } from '@advent-of-code-2024/utils'

export function* getOperatorIndexesForNumber(
    num: number,
    count: number,
    base = 2,
) {
    for (const i of sequence(count)) {
        const result = Math.floor(num / base ** i) % base
        yield result
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
