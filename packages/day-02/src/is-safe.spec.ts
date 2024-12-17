import { describe, expect, it } from '@jest/globals'
import { isAscending, isDescending, isSafe } from './is-safe.ts'

describe('is-safe', () => {
    describe('isSafe', () => {
        it('should return the expected result', () => {
            const examples = {
                safe: [
                    [7, 6, 4, 2, 1],
                    [1, 3, 6, 7, 9],
                ],
                unsafe: [
                    [1, 2, 7, 8, 9],
                    [9, 7, 6, 2, 1],
                    [1, 3, 2, 4, 5],
                    [8, 6, 4, 4, 1],
                ],
            }

            for (const example of examples.safe) {
                expect(isSafe(example)).toBeTruthy()
            }

            for (const example of examples.unsafe) {
                expect(isSafe(example)).toBeFalsy()
            }
        })
    })

    describe('isAscending', () => {
        it('should return true for an ascending array', () => {
            const example = [1, 2, 3, 4, 5]
            expect(isAscending(example)).toBeTruthy()
        })

        it('should return false for a non-ascending array', () => {
            const example = [5, 4, 3, 2, 1]
            expect(isAscending(example)).toBeFalsy()
        })
    })

    describe('isDescending', () => {
        it('should return true for a descending array', () => {
            const example = [5, 4, 3, 2, 1]
            expect(isDescending(example)).toBeTruthy()
        })
        it('should return false for a non-descending array', () => {
            const example = [1, 2, 3, 4, 5]
            expect(isDescending(example)).toBeFalsy()
        })
    })
})
