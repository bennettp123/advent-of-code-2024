import {
    Board,
    MutableBoard,
    type Position,
    readInput,
    sequence,
    stripTrailingEmpties,
} from '@advent-of-code-2024/utils'
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

console.log(
    `before: antinodes width: ${antinodes.width}, height: ${antinodes.height}`,
)
console.log(antinodes.toString())

for (const frequency of frequencies) {
    const antennas = antennasByFrequency.get(frequency) ?? []
    antennas.forEach((a, aIdx) => {
        antennas.forEach((b, bIdx) => {
            if (aIdx > bIdx) {
                const offset: Position = {
                    row: Math.abs(a.position.row - b.position.row),
                    column: Math.abs(a.position.column - b.position.column),
                }
                const antinode1: Position = {
                    row: Math.max(a.position.row, b.position.row) + offset.row,
                    column:
                        Math.max(a.position.column, b.position.column) +
                        offset.column,
                }
                const antinode2: Position = {
                    row: Math.min(a.position.row, b.position.row) - offset.row,
                    column:
                        Math.min(a.position.column, b.position.column) -
                        offset.column,
                }
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
console.log(
    console.log(
        `after: antinodes width: ${antinodes.width}, height: ${antinodes.height}`,
    ),
)
console.log(antinodes.toString())

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
