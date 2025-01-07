import { Direction } from '@advent-of-code-2024/utils'
import { describe, expect, it } from '@jest/globals'
import {
    countXMAS,
    getCharAt,
    getDiagonal,
    getDiagonalChars,
    isXMAS,
    sequence,
} from './word-search-utils'

describe('word-search-utils', () => {
    describe('getDiagonal', () => {
        it('should return the expected results', () => {
            /**
             * a b c
             * d e f
             */
            const board = 'abc\ndef'

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 0 },
                    direction: Direction.UP_LEFT,
                }),
            ).toBe('a')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 1 },
                    direction: Direction.UP_LEFT,
                }),
            ).toBe('b')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 2 },
                    direction: Direction.UP_LEFT,
                }),
            ).toBe('c')

            expect(
                getDiagonal({
                    board,
                    start: { row: 1, column: 0 },
                    direction: Direction.UP_LEFT,
                }),
            ).toBe('d')

            expect(
                getDiagonal({
                    board,
                    start: { row: 1, column: 1 },
                    direction: Direction.UP_LEFT,
                }),
            ).toBe('ea')

            expect(
                getDiagonal({
                    board,
                    start: { row: 1, column: 2 },
                    direction: Direction.UP_LEFT,
                }),
            ).toBe('fb')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 0 },
                    direction: Direction.UP_RIGHT,
                }),
            ).toBe('a')

            expect(
                getDiagonal({
                    board,
                    start: { row: 1, column: 0 },
                    direction: Direction.UP_RIGHT,
                }),
            ).toBe('db')

            expect(
                getDiagonal({
                    board,
                    start: { row: 1, column: 1 },
                    direction: Direction.UP_RIGHT,
                }),
            ).toBe('ec')

            expect(
                getDiagonal({
                    board,
                    start: { row: 1, column: 2 },
                    direction: Direction.UP_RIGHT,
                }),
            ).toBe('f')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 0 },
                    direction: Direction.DOWN_LEFT,
                }),
            ).toBe('a')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 1 },
                    direction: Direction.DOWN_LEFT,
                }),
            ).toBe('bd')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 2 },
                    direction: Direction.DOWN_LEFT,
                }),
            ).toBe('ce')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 0 },
                    direction: Direction.DOWN_RIGHT,
                }),
            ).toBe('ae')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 1 },
                    direction: Direction.DOWN_RIGHT,
                }),
            ).toBe('bf')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 1 },
                    maxLength: 1,
                    direction: Direction.DOWN_RIGHT,
                }),
            ).toBe('b')

            expect(
                getDiagonal({
                    board,
                    start: { row: 0, column: 2 },
                    direction: Direction.DOWN_RIGHT,
                }),
            ).toBe('c')
        })
    })

    describe('getCharAt', () => {
        it('should return the expected results', () => {
            /**
             * a b c d e f
             * g h i j k l
             * m n o p q r
             * s t u v w x
             */
            const board = 'abcdef\nghijkl\nmnopqr\nstuvwx'
            expect(getCharAt({ board, pos: { row: 0, column: 0 } })).toBe('a')
            expect(getCharAt({ board, pos: { row: 3, column: 4 } })).toBe('w')
            expect(
                getCharAt({ board, pos: { row: 4, column: 4 } }),
            ).toBeUndefined()
        })
    })

    describe('getDiagonalChars', () => {
        it('should return the expected results', () => {
            /**
             * a b c d e f
             * g h i j k l
             * m n o p q r
             * s t u v w x
             */
            const board = 'abcdef\nghijkl\nmnopqr\nstuvwx'
            const result = getDiagonalChars({
                board,
                pos: { row: 2, column: 4 },
            })

            expect(result[Direction.UP_LEFT]).toBe('j')
            expect(result[Direction.UP_RIGHT]).toBe('l')
            expect(result[Direction.DOWN_LEFT]).toBe('v')
            expect(result[Direction.DOWN_RIGHT]).toBe('x')

            const outOfBoundsResult = getDiagonalChars({
                board,
                pos: { row: 3, column: 4 },
            })

            expect(outOfBoundsResult[Direction.UP_LEFT]).toBe('p')
            expect(outOfBoundsResult[Direction.UP_RIGHT]).toBe('r')
            expect(outOfBoundsResult[Direction.DOWN_LEFT]).toBeUndefined()
            expect(outOfBoundsResult[Direction.DOWN_RIGHT]).toBeUndefined()
        })
    })

    describe('isXMAS', () => {
        it('should produce correct results', () => {
            /*
              . M . S . . . . . .
              . . A . . M S M S .
              . M . S . M A A . .
              . . A . A S M S M .
              . M . S . M . . . .
              . . . . . . . A . .
              S . S . S . S . S .
              . A . A . A . A . .
              M . M . M . M . M .
              . . . . . . . . . .
            */
            const board = [
                '.M.S......',
                '..A..MSMS.',
                '.M.S.MAA..',
                '..A.ASMSM.',
                '.M.S.M....',
                '.......A..',
                'S.S.S.S.S.',
                '.A.A.A.A..',
                'M.M.M.M.M.',
                '..........',
            ].join('\n')

            expect(isXMAS({ board, pos: { row: 0, column: 0 } })).toBeFalsy()
            expect(isXMAS({ board, pos: { row: 1, column: 2 } })).toBeTruthy()

            expect(isXMAS({ board, pos: { row: 2, column: 6 } })).toBeTruthy()
            expect(isXMAS({ board, pos: { row: 2, column: 7 } })).toBeTruthy()

            expect(isXMAS({ board, pos: { row: 3, column: 2 } })).toBeTruthy()
            expect(isXMAS({ board, pos: { row: 3, column: 4 } })).toBeTruthy()

            expect(isXMAS({ board, pos: { row: 5, column: 7 } })).toBeFalsy()

            expect(isXMAS({ board, pos: { row: 7, column: 1 } })).toBeTruthy()
            expect(isXMAS({ board, pos: { row: 7, column: 3 } })).toBeTruthy()
            expect(isXMAS({ board, pos: { row: 7, column: 5 } })).toBeTruthy()
            expect(isXMAS({ board, pos: { row: 7, column: 7 } })).toBeTruthy()
        })

        it(`shouldn't get confused by SAS and MAM`, () => {
            /*
              M . S
              . A .
              S . M
            */
            const board = ['M.S', '.A.', 'S.M'].join('\n')

            expect(isXMAS({ board, pos: { row: 1, column: 1 } })).toBeFalsy()
        })
    })

    describe('countXMAS', () => {
        it('should produce the expected results', () => {
            /*
              M M M S X X M A S M
              M S A M X M S M S A
              A M X S X M A A M M
              M S A M A S M S M X
              X M A S A M X A M M
              X X A M M X X A M A
              S M S M S A S X S S
              S A X A M A S A A A
              M A M M M X M M M M
              M X M X A X M A S X
            */
            const board = [
                'MMMSXXMASM',
                'MSAMXMSMSA',
                'AMXSXMAAMM',
                'MSAMASMSMX',
                'XMASAMXAMM',
                'XXAMMXXAMA',
                'SMSMSASXSS',
                'SAXAMASAAA',
                'MAMMMXMMMM',
                'MXMXAXMASX',
            ].join('\n')

            expect(countXMAS({ board })).toBe(9)
        })
    })

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
})
