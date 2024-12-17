export function parseInput(input: string): number[][] {
    const lines = input.split('\n').filter(Boolean)
    return lines.map(line => line.split(/\s+/).map(Number))
}

export default parseInput
