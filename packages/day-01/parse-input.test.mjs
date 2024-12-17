import { parseInput } from './parse-input.mjs'

describe('parseInput', () => {
    it('should return the expected result', () => {
        const input = [
            '3   4',
            '4   3',
            '2   5',
            '1   3',
            '3   9',
            '3   3',
        ].join('\n')
        const expected = [
            [3, 4, 2, 1, 3, 3],
            [4, 3, 5, 3, 9, 3],
        ]
        const result = parseInput(input)
        
        for (const index in expected[0]) {
            expect(expected[0][index]).toStrictEqual(result[0][index])
        }

        for (const index in expected[1]) {
            expect(expected[1][index]).toStrictEqual(result[1][index])
        }
    })
})