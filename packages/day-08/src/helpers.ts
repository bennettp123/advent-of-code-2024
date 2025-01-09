import { type Position, isPosition } from '@advent-of-code-2024/utils'
import Victor from 'victor'

export function getAntinodePositions(
    a: Position | Victor,
    b: Position | Victor,
): [Position, Position] {
    const aVec = isPosition(a) ? new Victor(a.column, a.row) : a.clone()
    const bVec = isPosition(b) ? new Victor(b.column, b.row) : b.clone()
    const offset = aVec.clone().subtract(bVec)
    const result1 = aVec.clone().add(offset)
    const result2 = bVec.clone().subtract(offset)
    return [
        { column: result1.x, row: result1.y },
        { column: result2.x, row: result2.y },
    ]
}

// part 2: same as above, but generate a repeating sequence of antinode positions
export function* getRepeatingAntinodePositions(
    a: Position | Victor,
    b: Position | Victor,
    direction: boolean,
): Generator<Position> {
    const aVec = isPosition(a) ? new Victor(a.column, a.row) : a.clone()
    const bVec = isPosition(b) ? new Victor(b.column, b.row) : b.clone()
    const offset = aVec.clone().subtract(bVec)
    let result: Victor | undefined = undefined
    while (true) {
        if (direction) {
            result = (result ?? aVec).clone().add(offset)
        } else {
            result = (result ?? bVec).clone().subtract(offset)
        }
        yield { column: result.x, row: result.y }
    }
}
