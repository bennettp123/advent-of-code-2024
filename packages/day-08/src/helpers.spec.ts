import { describe, expect, it } from '@jest/globals'
import { getAntinodePositions } from './helpers'

describe('helpers', () =>
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
    }))
