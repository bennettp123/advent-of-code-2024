import {
    Board,
    MutableBoard,
    type Position,
    readInput,
    sequence,
    stripTrailingEmpties,
} from '@advent-of-code-2024/utils'

import Victor from 'victor'
import { getAntinodePositions } from './src/helpers'

const input = [
    ...(await readInput('input.txt').then(stripTrailingEmpties)),
].join('\n')
const board = new Board(input)

type Frequency = string

type Antenna = {
    frequency: Frequency
    position: Position
}

const antennas: Antenna[] = []

for (const row of sequence(board.height)) {
    for (const column of sequence(board.width)) {
        const pos = { row, column }
        const char = board.get(pos)
        if (char !== '.') {
            antennas.push({ frequency: char, position: pos })
        }
    }
}

const antennasByFrequency = new Map<Frequency, Antenna[]>()

for (const antenna of antennas) {
    const existingAntennas = antennasByFrequency.get(antenna.frequency) ?? []
    existingAntennas.push(antenna)
    antennasByFrequency.set(antenna.frequency, existingAntennas)
}

const frequencies = Array.from(antennasByFrequency.keys())

const antinodes = MutableBoard.from(board)

for (const frequency of frequencies) {
    const antennas = antennasByFrequency.get(frequency) ?? []
    antennas.forEach((a, aIdx) => {
        antennas.forEach((b, bIdx) => {
            if (aIdx > bIdx) {
                const [antinode1, antinode2] = getAntinodePositions(
                    a.position,
                    b.position,
                )
                if (antinodes.isInBounds(antinode1)) {
                    antinodes.set(antinode1, '#')
                }
                if (antinodes.isInBounds(antinode2)) {
                    antinodes.set(antinode2, '#')
                }
            }
        })
    })
}

let antinodesCount = 0
for (const row of sequence(antinodes.height)) {
    for (const column of sequence(antinodes.width)) {
        const pos = { row, column }
        if (antinodes.get(pos) === '#') {
            antinodesCount = antinodesCount + 1
        }
    }
}

console.info(`part 1: ${antinodesCount} antinodes found`)
