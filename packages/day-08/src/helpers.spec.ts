import { type Position, sequence } from '@advent-of-code-2024/utils'
import { describe, expect, it } from '@jest/globals'
import { getAntinodePositions, getRepeatingAntinodePositions } from './helpers'

describe('helpers', () => {
    describe('getAntinodePositions', () => {
        it('should return the expected results', () => {
            expect(
                getAntinodePositions(
                    { row: 0, column: 0 },
                    { row: 1, column: 1 },
                ),
            ).toEqual(
                expect.arrayContaining([
                    { row: 2, column: 2 },
                    { row: -1, column: -1 },
                ]),
            )

            expect(
                getAntinodePositions(
                    { row: 0, column: 0 },
                    { row: 1, column: 0 },
                ),
            ).toEqual(
                expect.arrayContaining([
                    { row: 2, column: 0 },
                    { row: -1, column: 0 },
                ]),
            )

            expect(
                getAntinodePositions(
                    { row: Number.MAX_SAFE_INTEGER, column: 0 },
                    { row: Number.MAX_SAFE_INTEGER, column: 1 },
                ),
            ).toEqual(
                expect.arrayContaining([
                    { row: Number.MAX_SAFE_INTEGER, column: -1 },
                    { row: Number.MAX_SAFE_INTEGER, column: 2 },
                ]),
            )

            expect(
                getAntinodePositions(
                    { row: 10, column: 5 },
                    { row: 0, column: 1 },
                ),
            ).toEqual(
                expect.arrayContaining([
                    { row: 20, column: 9 },
                    { row: -10, column: -3 },
                ]),
            )
        })
    })
    describe('getRepeatingAntinodePositions', () => {
        it('should return the expected results', () => {
            const result: Position[] = []

            let count = 0
            for (const antinode of getRepeatingAntinodePositions(
                { row: 0, column: 0 },
                { row: 1, column: 1 },
                true,
            )) {
                result.push(antinode)
                if (count > 4) {
                    break
                }
                count = count + 1
            }

            count = 0
            for (const antinode of getRepeatingAntinodePositions(
                { row: 0, column: 0 },
                { row: 1, column: 1 },
                false,
            )) {
                result.push(antinode)
                if (count > 4) {
                    break
                }
                count = count + 1
            }

            expect(result).toEqual(
                expect.arrayContaining([
                    { row: 2, column: 2 },
                    { row: 3, column: 3 },
                    { row: 4, column: 4 },
                    { row: 5, column: 5 },
                    { row: -1, column: -1 },
                    { row: -2, column: -2 },
                    { row: -3, column: -3 },
                    { row: -4, column: -4 },
                ]),
            )
        })
        it('should match the behaviour of getAntinodePositions for the first result in each direction', () => {
            const positions = [
                { row: 10, column: 5 },
                { row: 0, column: 1 },
            ] as const

            const expected = getAntinodePositions(...positions)

            const actual = [
                getRepeatingAntinodePositions(
                    ...([...positions, true] as const),
                ).next().value,
                getRepeatingAntinodePositions(
                    ...([...positions, false] as const),
                ).next().value,
            ]

            expect(expected).toEqual(actual)
        })
    })
})
