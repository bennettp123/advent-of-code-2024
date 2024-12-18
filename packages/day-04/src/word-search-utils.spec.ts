import { describe, expect, it } from '@jest/globals'
import {
    getAllColumns,
    getAllDiagonals,
    getAllRows,
    getBoardDimensions,
} from './word-search-utils'

describe('word-search-utils', () => {
    describe('getAllRows', () => {
        it('should convert a board to rows', () => {
            expect(getAllRows('abc\ndef\nghi')).toEqual(['abc', 'def', 'ghi'])
        })
    })
    describe('getAllColumns', () => {
        it('should convert a board to columns', () => {
            expect(getAllColumns('abc\ndef\nghi')).toEqual([
                'adg',
                'beh',
                'cfi',
            ])
        })
    })

    describe('getAllDiagonals', () => {
        it('should convert a square board to diagonals', () => {
            /**
             * a b c
             * d e f
             * g h i
             */
            expect(getAllDiagonals('abc\ndef\nghi').sort()).toEqual(
                [
                    'a',
                    'bd',
                    'ceg',
                    'fh',
                    'i',
                    'c',
                    'bf',
                    'aei',
                    'dh',
                    'g',
                ].sort(),
            )
        })
        it('should convert a rectangular board to diagonals', () => {
            /**
             * a b
             * c d
             * e f
             * g h
             */
            expect(getAllDiagonals('ab\ncd\nef\ngh').sort()).toEqual(
                ['a', 'bc', 'de', 'fg', 'h', 'b', 'ad', 'cf', 'eh', 'g'].sort(),
            )

            /**
             * a b c
             * d e f
             */
            expect(getAllDiagonals('abc\ndef').sort()).toEqual(
                ['a', 'bd', 'ce', 'f', 'c', 'bf', 'ae', 'd'].sort(),
            )
        })
    })

    describe('getBoardDimensions', () => {
        it('should get the dimensions of a board', () => {
            expect(getBoardDimensions('abc\ndef\nghi')).toEqual({
                width: 3,
                height: 3,
            })
        })
    })
})
