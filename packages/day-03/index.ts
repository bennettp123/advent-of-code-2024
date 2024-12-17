import { readInput } from '@advent-of-code-2024/utils'
import { parse } from './src/parse'
const input = await readInput('input.txt')
const parsedInput = [...parse(input)]
const sum = parsedInput.reduce((acc, value) => acc + value, 0)
console.debug({ parsedInput, sum })
