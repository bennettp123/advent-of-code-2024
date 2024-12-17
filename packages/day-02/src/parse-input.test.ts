import { describe, expect, it } from '@jest/globals'
import { parseInput } from './parse-input.ts'

describe('parseInput', () => {
    it('should return the expected result', () => {
        const input = [
            '7 6 4 2 1',
            '1 2 7 8 9',
            '9 7 6 2 1',
            '1 3 2 4 5',
            '8 6 4 4 1',
            '1 3 6 7 9',
        ]
        const expected = [
            [7, 6, 4, 2, 1],
            [1, 2, 7, 8, 9],
            [9, 7, 6, 2, 1],
            [1, 3, 2, 4, 5],
            [8, 6, 4, 4, 1],
            [1, 3, 6, 7, 9],
        ]
        const result = parseInput(input.join('\n'))

        expect(result.length).toStrictEqual(input.length)
        expect(result).toEqual(expected)
    })
})
