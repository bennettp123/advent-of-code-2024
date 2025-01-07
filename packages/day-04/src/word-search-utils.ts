export function getAllRows(board: string): string[] {
    return board.split('\n')
}

export function getAllColumns(board: string): string[] {
    const rows = getAllRows(board)
    const columns: string[] = []
    for (let i = 0; i < rows[0].length; i++) {
        columns.push(rows.map(row => row[i]).join(''))
    }
    return columns
}

export function* sequence(start: number, end?: number) {
    if (end === undefined) {
        for (const i of sequence(0, start)) {
            yield i
        }
    } else {
        for (let i = start; i < end; i++) {
            yield i
        }
    }
}

export enum Direction {
    UP_LEFT = 'UP_LEFT',
    UP_RIGHT = 'UP_RIGHT',
    DOWN_LEFT = 'DOWN_LEFT',
    DOWN_RIGHT = 'DOWN_RIGHT',
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export interface Position {
    row: number
    column: number
}

export interface DiagonalChars {
    [Direction.UP_LEFT]: string
    [Direction.UP_RIGHT]: string
    [Direction.DOWN_LEFT]: string
    [Direction.DOWN_RIGHT]: string
}

export function countXMAS({ board }: { board: string }): number {
    const { width, height } = getBoardDimensions(board)
    let count = 0
    for (const row of sequence(height)) {
        for (const column of sequence(width)) {
            const pos = { row, column }
            if (isXMAS({ board, pos })) {
                count = count + 1
            }
        }
    }
    return count
}

export function isXMAS({ board, pos }: { board: string; pos: Position }) {
    const centerChar = getCharAt({ board, pos })
    if (centerChar !== 'A') {
        return false
    }
    const diagonals = getDiagonalChars({ board, pos })

    switch (diagonals[Direction.UP_LEFT]) {
        case 'M':
            if (diagonals[Direction.DOWN_RIGHT] !== 'S') {
                return false
            }
            break
        case 'S':
            if (diagonals[Direction.DOWN_RIGHT] !== 'M') {
                return false
            }
            break
        default:
            return false
    }

    switch (diagonals[Direction.UP_RIGHT]) {
        case 'M':
            if (diagonals[Direction.DOWN_LEFT] !== 'S') {
                return false
            }
            break
        case 'S':
            if (diagonals[Direction.DOWN_LEFT] !== 'M') {
                return false
            }
            break
        default:
            return false
    }
    return true
}

export function getCharAt({ board, pos }: { board: string; pos: Position }) {
    const rows = getAllRows(board)
    const { row, column } = pos
    return rows[row]?.[column]
}

export function getDiagonalChars({
    board,
    pos,
}: { board: string; pos: Position }): DiagonalChars {
    const rows = getAllRows(board)
    return {
        [Direction.UP_LEFT]: rows[pos.row - 1]?.[pos.column - 1],
        [Direction.UP_RIGHT]: rows[pos.row - 1]?.[pos.column + 1],
        [Direction.DOWN_LEFT]: rows[pos.row + 1]?.[pos.column - 1],
        [Direction.DOWN_RIGHT]: rows[pos.row + 1]?.[pos.column + 1],
    }
}

export function getDiagonal({
    board,
    start,
    maxLength = Number.MAX_SAFE_INTEGER,
    direction,
}: {
    board: string
    start: Position
    maxLength?: number
    direction: Direction
}) {
    const rows = getAllRows(board)
    const { width, height } = getBoardDimensions(board)

    let { row, column } = start
    let result = ''
    while (row >= 0 && row < height && column >= 0 && column < width) {
        result += rows[row][column]

        switch (direction) {
            case Direction.UP:
            case Direction.UP_LEFT:
            case Direction.UP_RIGHT:
                row = row - 1
                break

            case Direction.DOWN:
            case Direction.DOWN_LEFT:
            case Direction.DOWN_RIGHT:
                row = row + 1
                break
        }

        switch (direction) {
            case Direction.UP_LEFT:
            case Direction.DOWN_LEFT:
            case Direction.LEFT:
                column = column - 1
                break

            case Direction.RIGHT:
            case Direction.UP_RIGHT:
            case Direction.DOWN_RIGHT:
                column = column + 1
                break
        }

        if (result.length >= maxLength) {
            break
        }
    }
    return result
}

export function getBoardDimensions(board: string): {
    width: number
    height: number
} {
    return {
        width: getAllRows(board).reduce(
            (max, row) => Math.max(max, row.length),
            0,
        ),
        height: getAllColumns(board).reduce(
            (max, row) => Math.max(max, row.length),
            0,
        ),
    }
}
