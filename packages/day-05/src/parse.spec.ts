import { describe, expect, it } from '@jest/globals'
import { parse } from './parse'

describe('parse', () => {
    describe('Update', () => {
        it('should behave as expected', () => {
            const { rules, updates } = parse(
                ['53|29', '75|47', '', '75,47,61,53,29'].join('\n'),
            )
            expect(updates[0].raw).toBe('75,47,61,53,29')
            expect(updates[0].items.length).toBe(5)
            expect(updates[0].items).toEqual('75,47,61,53,29'.split(','))
            expect(updates[0].middle).toBe('61')

            expect(updates[0].check(rules[0])).toBeTruthy()
            expect(updates[0].check(rules[1])).toBeTruthy()
            expect(updates[0].check(rules)).toBeTruthy()
        })
    })

    describe('Rules', () => {
        it('should behave as expected', () => {
            const { rules, updates } = parse(
                ['53|29', '75|47', '', '75,47,61,53,29'].join('\n'),
            )
            expect(rules[0].check(updates[0].items)).toBeTruthy()
            expect(rules[1].check(updates[0].items)).toBeTruthy()
        })
    })

    describe('parse', () => {
        it('should return a set of rules and a set of updates', () => {
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

            const parsed = parse(input)
            expect(parsed.rules.length).toBe(21)
            expect(parsed.updates.length).toBe(6)

            expect(parsed.rules.map(rule => rule.raw).sort()).toEqual(
                [
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
                ].sort(),
            )

            expect(parsed.updates.map(update => update.raw).sort()).toEqual(
                [
                    '75,47,61,53,29',
                    '97,61,53,29,13',
                    '75,29,13',
                    '75,97,47,61,53',
                    '61,13,29',
                    '97,13,75,29,47',
                ].sort(),
            )
        })
    })
})
