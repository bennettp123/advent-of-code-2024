import fs from 'node:fs/promises'
export function readInput(file: string): Promise<string> {
    return fs.readFile(file, { encoding: 'utf8', flag: 'r' })
}

export function* stripTrailingEmpties(input: string) {
    const lines = input.split('\n')
    while (lines[lines.length - 1] === '') {
        lines.pop()
    }
    yield* lines
}
