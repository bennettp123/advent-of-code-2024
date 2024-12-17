import { describe, expect, it } from '@jest/globals'
import { parse } from './parse'

describe('parse', () => {
    it('should parse the simple examples provided', () => {
        expect([...parse('mul(44,46)')]).toEqual([44 * 46])
        expect([...parse('mul(123,4)')]).toEqual([123 * 4])
    })
    it('should ignore corrupted input', () => {
        expect([...parse('mul(4*')]).toEqual([])
        expect([...parse('mul(6,9!')]).toEqual([])
        expect([...parse('?(12,34)')]).toEqual([])
        expect([...parse('mul ( 2 , 4 )')]).toEqual([])
    })
    it('should parse the valid tokens in the example provided, ignoring corrupted tokens', () => {
        expect([
            ...parse(
                'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
            ),
        ]).toEqual([2 * 4, 5 * 5, 11 * 8, 8 * 5])
    })
})
