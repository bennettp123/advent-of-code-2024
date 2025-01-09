import {
    Board,
    MutableBoard,
    type Position,
    readInput,
    sequence,
    stripTrailingEmpties,
} from '@advent-of-code-2024/utils'

import { getRepeatingAntinodePositions } from './src/helpers'

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

const part1Antinodes = MutableBoard.from(board)
const part2Antinodes = MutableBoard.from(board)

for (const frequency of frequencies) {
    const antennas = antennasByFrequency.get(frequency) ?? []
    antennas.forEach((a, aIdx) => {
        antennas.forEach((b, bIdx) => {
            if (aIdx > bIdx) {
                for (const direction of [true, false]) {
                    let count = 0
                    for (const antinode of getRepeatingAntinodePositions(
                        a.position,
                        b.position,
                        direction,
                    )) {
                        if (count < 1) {
                            if (part1Antinodes.isInBounds(antinode)) {
                                part1Antinodes.set(antinode, '#')
                            }
                        }
                        count = count + 1
                        if (part2Antinodes.isInBounds(antinode)) {
                            part2Antinodes.set(antinode, '#')
                        } else {
                            break
                        }
                    }
                }
            }
        })
    })
}

let part1AntinodesCount = 0
for (const row of sequence(part1Antinodes.height)) {
    for (const column of sequence(part1Antinodes.width)) {
        const pos = { row, column }
        if (part1Antinodes.get(pos) === '#') {
            part1AntinodesCount = part1AntinodesCount + 1
        }
    }
}

console.info(`part 1: ${part1AntinodesCount} antinodes found`)

let part2AntinodesCount = 0
for (const row of sequence(part2Antinodes.height)) {
    for (const column of sequence(part2Antinodes.width)) {
        const pos = { row, column }
        if (part2Antinodes.get(pos) === '#') {
            part2AntinodesCount = part2AntinodesCount + 1
        }
    }
}

console.debug(part2Antinodes.toString())

console.info(`part 2: ${part2AntinodesCount} antinodes found`)
