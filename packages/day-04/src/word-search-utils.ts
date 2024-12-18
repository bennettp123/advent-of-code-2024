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

function* sequence(start: number, end?: number) {
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

export function getAllDiagonals(board: string): string[] {
    const rows = getAllRows(board)
    const columns = getAllColumns(board)
    const { width, height } = getBoardDimensions(board)

    const diagonals: string[] = []
    for (const x of sequence(width)) {
        let forwardsDiagonal = ''
        let backwardsDiagonal = ''
        for (const y of sequence(height)) {
            forwardsDiagonal += rows[y]?.[x + y] ?? ''
            backwardsDiagonal += rows[y]?.[x - y] ?? ''
        }
        diagonals.push(forwardsDiagonal)
        diagonals.push(backwardsDiagonal)
    }

    for (const y of sequence(height)) {
        let forwardsDiagonal = ''
        let backwardsDiagonal = ''
        for (const x of sequence(width)) {
            forwardsDiagonal += columns[x]?.[y + x] ?? ''
            backwardsDiagonal += columns[width - x]?.[y + x] ?? ''
        }
        diagonals.push(forwardsDiagonal)
        if (backwardsDiagonal) diagonals.push(backwardsDiagonal)
    }

    return [...new Set(diagonals)]
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
