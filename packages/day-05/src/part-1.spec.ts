import { describe, expect, it } from '@jest/globals'
import { parse } from './parse'
import { getMiddleCorrectUpdates } from './part-1'

describe('part-1', () => {
    const input = [
        // rules
        '47|53',
        '97|13',
        '97|61',
        '97|47',
        '75|29',
        '61|13',
        '75|53',
        '29|13',
        '97|29',
        '53|29',
        '61|53',
        '97|53',
        '61|29',
        '47|13',
        '75|47',
        '97|75',
        '47|61',
        '75|61',
        '47|29',
        '75|13',
        '53|13',

        // separated by an empty line
        '',

        // updates
        '75,47,61,53,29',
        '97,61,53,29,13',
        '75,29,13',
        '75,97,47,61,53',
        '61,13,29',
        '97,13,75,29,47',
    ].join('\n')

    describe('Rule.check', () => {
        it('should match the examples provided', () => {
            const { rules, updates } = parse(input)

            // first update should be correctly ordered
            expect(updates[0].raw).toBe('75,47,61,53,29')
            expect(updates[0].check(rules)).toBeTruthy()

            // second and third updates should be correctly ordered too
            expect(updates[1].raw).toBe('97,61,53,29,13')
            expect(updates[1].check(rules)).toBeTruthy()
            expect(updates[2].raw).toBe('75,29,13')
            expect(updates[2].check(rules)).toBeTruthy()

            // fourth, fifth and sixth update should NOT be correctly ordered
            expect(updates[3].raw).toBe('75,97,47,61,53')
            expect(updates[3].check(rules)).toBeFalsy()
            expect(updates[4].raw).toBe('61,13,29')
            expect(updates[4].check(rules)).toBeFalsy()
            expect(updates[5].raw).toBe('97,13,75,29,47')
            expect(updates[5].check(rules)).toBeFalsy()
        })
    })
    describe('getMiddleCorrectUpdates', () => {
        it('should match the examples provided', () => {
            const { rules, updates } = parse(input)
            expect(getMiddleCorrectUpdates({ rules, updates })).toBe(143)
        })
    })
})
