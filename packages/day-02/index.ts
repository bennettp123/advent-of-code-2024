import { readInput } from '@advent-of-code-2024/utils'
import { isSafe } from './src/is-safe'
import { parseInput } from './src/parse-input'

const input = await readInput('input.txt')
const records = parseInput(input)

const safeRecords = records.filter(isSafe())
console.info({ note: 'part 1', safeRecords: safeRecords.length })

const mostlySafeRecords = records.filter(isSafe({ allowUnsafeValues: 1 }))
console.info({ note: 'part 1', mostlySafeRecords: mostlySafeRecords.length })
