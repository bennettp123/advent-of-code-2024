import { describe, expect, it } from '@jest/globals'
import { parse } from './parse'
import { getIncorrectUpdates } from './part-2'

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

    describe('getIncorrectUpdates', () => {
        it('should match the expected results', () => {
            const { rules, updates } = parse(input)
            const results = getIncorrectUpdates({ rules, updates })

            expect(results.length).toBe(3)
            expect(results[0].raw).toBe('75,97,47,61,53')
            expect(results[1].raw).toBe('61,13,29')
            expect(results[2].raw).toBe('97,13,75,29,47')
        })
    })
})
