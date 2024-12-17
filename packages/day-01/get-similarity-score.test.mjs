import { getSimilarityScore } from './get-similarity-score.mjs'

describe('getSimilarityScore', () => {
    it('should match the example', () => {
        const expected = 31
        const result = getSimilarityScore(
            [3, 4, 2, 1, 3, 3],
            [4, 3, 5, 3, 9, 3],
        )
        expect(result).toStrictEqual(expected)
    })
})
