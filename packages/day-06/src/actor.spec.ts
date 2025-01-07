import { Board, Direction } from '@advent-of-code-2024/utils'
import { describe, expect, it, jest } from '@jest/globals'
import { Actor } from './actor'

describe('actor', () => {
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
    ].join('\n')

    describe('Actor', () => {
        it('should behave as expected', () => {
            const board = new Board(input)
            const actor = new Actor(board)
            expect(actor.position.row).toBe(6)
            expect(actor.position.column).toBe(4)
            expect(actor.direction).toBe(Direction.UP)
            expect(actor.totalSteps).toBe(0)
            expect(actor.positionsVisited.length).toBe(1)

            expect(actor.step()).toBeTruthy()
            expect(actor.step()).toBeTruthy()
            expect(actor.step()).toBeTruthy()
            expect(actor.step()).toBeTruthy()
            expect(actor.step()).toBeTruthy()

            expect(actor.position.row).toBe(1)
            expect(actor.position.column).toBe(4)
            expect(actor.direction).toBe(Direction.UP)
            expect(actor.totalSteps).toBe(5)
            expect(actor.positionsVisited.length).toBe(6)

            // next step is an obstacle: turn right and walk one step
            expect(actor.step()).toBeTruthy()

            expect(actor.position.row).toBe(1)
            expect(actor.position.column).toBe(5)
            expect(actor.direction).toBe(Direction.RIGHT)
            expect(actor.totalSteps).toBe(6)
            expect(actor.positionsVisited.length).toBe(7)

            const result = actor.walk()

            expect(actor.positionsVisited.length).toBe(41)
            expect(result.reasonForStopping).toBe('OFF_BOARD')
        })

        it('should call the provided callback, terminating early if it returns true', () => {
            const board = new Board(input)
            const actor = new Actor(board)

            expect(actor.position.row).toBe(6)
            expect(actor.position.column).toBe(4)
            expect(actor.direction).toBe(Direction.UP)
            expect(actor.totalSteps).toBe(0)
            expect(actor.positionsVisited.length).toBe(1)

            const nonTerminatingStepOnceCallback = jest.fn(() => false)
            const nonTerminatingResult = actor.stepOnce(
                nonTerminatingStepOnceCallback,
            )
            expect(nonTerminatingStepOnceCallback).toHaveBeenCalledTimes(1)
            expect(actor.position.row).toBe(5)
            expect(actor.position.column).toBe(4)
            expect(actor.direction).toBe(Direction.UP)
            expect(actor.totalSteps).toBe(1)
            expect(actor.positionsVisited.length).toBe(2)
            expect(nonTerminatingResult.reasonForStopping).toBeUndefined()

            const terminatingStepOnceCallback = jest.fn(() => true)
            const terminatingResult = actor.stepOnce(
                terminatingStepOnceCallback,
            )
            expect(terminatingStepOnceCallback).toHaveBeenCalledTimes(1)
            expect(actor.position.row).toBe(5)
            expect(actor.position.column).toBe(4)
            expect(actor.direction).toBe(Direction.UP)
            expect(actor.totalSteps).toBe(1)
            expect(actor.positionsVisited.length).toBe(2)
            expect(terminatingResult.reasonForStopping).toBe('CALLBACK')

            const nonTerminatingWalkCallback = jest.fn(() => false)
            const terminatingWalkResultMaxSteps = actor.walk(
                1,
                nonTerminatingWalkCallback,
            )
            expect(nonTerminatingWalkCallback).toHaveBeenCalledTimes(1)
            expect(actor.position.row).toBe(4)
            expect(actor.position.column).toBe(4)
            expect(actor.direction).toBe(Direction.UP)
            expect(actor.totalSteps).toBe(2)
            expect(actor.positionsVisited.length).toBe(3)
            expect(terminatingWalkResultMaxSteps.reasonForStopping).toBe(
                'MAX_STEPS',
            )

            const terminatingWalkCallback = jest.fn(() => true)
            const terminatingWalkResultCallback = actor.walk(
                Number.MAX_SAFE_INTEGER,
                terminatingWalkCallback,
            )
            expect(terminatingWalkCallback).toHaveBeenCalledTimes(1)
            expect(actor.position.row).toBe(4)
            expect(actor.position.column).toBe(4)
            expect(actor.direction).toBe(Direction.UP)
            expect(actor.totalSteps).toBe(2)
            expect(actor.positionsVisited.length).toBe(3)
            expect(terminatingWalkResultCallback.reasonForStopping).toBe(
                'CALLBACK',
            )

            const result = actor.walk(
                Number.MAX_SAFE_INTEGER,
                nonTerminatingWalkCallback,
            )
            expect(actor.positionsVisited.length).toBe(41)
            expect(result.reasonForStopping).toBe('OFF_BOARD')
        })
    })
})
