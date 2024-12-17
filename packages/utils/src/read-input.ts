import fs from 'node:fs/promises'
export function readInput(file: string): Promise<string> {
    return fs.readFile(file, { encoding: 'utf8', flag: 'r' })
}
