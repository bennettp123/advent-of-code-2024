import { describe, expect, it } from '@jest/globals'
import {
    Board,
    MutableBoard,
    getAllColumns,
    getAllRows,
    getBoardDimensions,
} from './board-utils'

describe('board-utils', () => {
    const input = [
        '....#.....',
        '.........#',
        '..........',
        '..#.......',
        '.......#..',
        '..........',
        '.#..^.....',
        '........#.',
        '#.........',
        '......#...',
        '..........',
    ].join('\n')

    describe('Board', () => {
        it('should behave as expected', () => {
            const board = new Board(input)
            expect(board.height).toBe(11)
            expect(board.width).toBe(10)

            expect(board.get({ row: 4, column: 7 })).toBe('#')
            expect(board.get({ row: 7, column: 4 })).toBe('.')
            expect(board.get({ row: -1, column: 0 })).toBeUndefined()
            expect(board.get({ row: 0, column: -1 })).toBeUndefined()
            expect(board.get({ row: 12, column: 0 })).toBeUndefined()
            expect(board.get({ row: 11, column: 11 })).toBeUndefined()

            expect(board.isInBounds({ row: 0, column: 0 })).toBeTruthy()
            expect(board.isInBounds({ row: 10, column: 9 })).toBeTruthy()
            expect(board.isInBounds({ row: 11, column: 10 })).toBeFalsy()
            expect(board.isInBounds({ row: 0, column: 11 })).toBeFalsy()
            expect(board.isInBounds({ row: 12, column: 10 })).toBeFalsy()
            expect(board.isInBounds({ row: 0, column: -100 })).toBeFalsy()
            expect(board.isInBounds({ row: -10, column: 10 })).toBeFalsy()
        })
    })

    describe('MutableBoard', () => {
        it('should behave like a Board', () => {
            const board = new Board(input)
            const mutableBoard = new MutableBoard(input)

            for (const idx of board.rows) {
                expect(board.rows[idx]).toEqual(mutableBoard.rows[idx])
            }

            expect(board.width).toEqual(mutableBoard.width)
            expect(board.height).toEqual(mutableBoard.height)
        })

        it('should allow individual items to be overridden using set(pos)', () => {
            const mutableBoard = new MutableBoard(input)
            const pos = { row: 3, column: 4 }
            const before = mutableBoard.get(pos)
            mutableBoard.set(pos, '!')
            const after = mutableBoard.get(pos)
            expect(before).not.toBe('!')
            expect(after).toBe('!')
        })
    })

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

    describe('getBoardDimensions', () => {
        it('should get the dimensions of a board', () => {
            expect(getBoardDimensions('abc\ndef\nghi')).toEqual({
                width: 3,
                height: 3,
            })
            expect(getBoardDimensions('abcd\nefgh\nijkl')).toEqual({
                width: 4,
                height: 3,
            })
        })
    })
})
