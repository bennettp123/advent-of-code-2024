import { describe, expect, it } from '@jest/globals'
import { parse } from './parse'

describe('parse', () => {
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

    describe('Update', () => {
        describe('check', () => {
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

        describe('fix', () => {
            it('should behave as expected', () => {
                const { rules, updates } = parse(input)

                const bad3 = updates[3]
                const fixed3 = bad3.fix(rules)

                expect(bad3.raw).toBe('75,97,47,61,53')
                expect(fixed3.raw).toBe('97,75,47,61,53')
                expect(fixed3.middle).toBe('47')

                const bad4 = updates[4]
                const fixed4 = bad4.fix(rules)

                expect(bad4.raw).toBe('61,13,29')
                expect(fixed4.raw).toBe('61,29,13')
                expect(fixed4.middle).toBe('29')

                const bad5 = updates[5]
                const fixed5 = bad5.fix(rules)

                expect(bad5.raw).toBe('97,13,75,29,47')
                expect(fixed5.raw).toBe('97,75,47,29,13')
                expect(fixed5.middle).toBe('47')
            })
        })
    })

    describe('Rule', () => {
        describe('check', () => {
            it('should behave as expected', () => {
                const { rules, updates } = parse(
                    ['53|29', '75|47', '', '75,47,61,53,29'].join('\n'),
                )
                expect(rules[0].check(updates[0].items)).toBeTruthy()
                expect(rules[1].check(updates[0].items)).toBeTruthy()
            })
        })

        describe.skip('fix', () => {
            it('should behave as expected', () => {
                const { rules, updates } = parse(input)

                expect(rules[0].raw).toEqual('29|13')
                expect(rules[0].fix(updates[1].items)).toEqual([
                    '61',
                    '29',
                    '13',
                ])

                expect(rules[1].raw).toEqual('47|13')
                expect(rules[1].fix(updates[2].items)).toEqual([
                    '97',
                    '47',
                    '13',
                    '75',
                    '29',
                ])

                expect(rules[2].raw).toEqual('75|47')
                expect(rules[2].fix(updates[0].items)).toEqual([
                    '97',
                    '75',
                    '47',
                    '61',
                    '53',
                ])

                expect(rules[3].raw).toEqual('97|75')

                expect(rules[4].raw).toEqual('47|29')

                expect(rules[5].raw).toEqual('75|13')
            })
        })
    })

    describe('parse', () => {
        it('should return a set of rules and a set of updates', () => {
            const parsed = parse(input)
            expect(parsed.rules.length).toBe(21)
            expect(parsed.updates.length).toBe(6)

            expect(parsed.rules.map(rule => rule.raw)).toEqual([
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
            ])

            expect(parsed.updates.map(update => update.raw)).toEqual([
                '75,47,61,53,29',
                '97,61,53,29,13',
                '75,29,13',
                '75,97,47,61,53',
                '61,13,29',
                '97,13,75,29,47',
            ])
        })
    })
})
