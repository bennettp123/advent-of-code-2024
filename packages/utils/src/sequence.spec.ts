import { describe, expect, it } from '@jest/globals'
import { sequence } from './sequence'

describe('sequence', () => {
    it('should produce a sequence of numbers from start to end, excluding the last number', () => {
        const iterator = sequence(10, 15)
        const result = [...iterator]
        expect(result).toEqual([10, 11, 12, 13, 14])
        expect(result.length).toBe(5)
    })

    it('should start from zero when provided with one arg', () => {
        const iterator = sequence(6)
        const result = [...iterator]
        expect(result).toEqual([0, 1, 2, 3, 4, 5])
        expect(result.length).toBe(6)
    })
})
