import { getSum } from './get-sum.mjs'

describe('getSum', () => {
    const first = ['3', '4', '2', '1', '3', '3']
    const second = ['4', '3', '5', '3', '9', '3']

    it('should return the result expected', () => {
        const expected = 11
        const result = getSum(first, second)
        expect(result).toStrictEqual(expected)
    })
})
