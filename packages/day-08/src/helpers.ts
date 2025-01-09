import type { Position } from '@advent-of-code-2024/utils'
import Victor from 'victor'

export function getAntinodePositions(a: Position, b: Position) {
    const aVec = new Victor(a.column, a.row)
    const bVec = new Victor(b.column, b.row)
    const offset = aVec.clone().subtract(bVec)
    return [aVec.clone().add(offset), bVec.clone().subtract(offset)].map(v => ({
        column: v.x,
        row: v.y,
    }))
}
