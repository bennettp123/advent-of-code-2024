export class Board {
    grid: string[][]
    get rows() {
        return this.grid.map(row => row.join(''))
    }
    private readonly _width: number
    public get width(): number {
        return this._width
    }
    private readonly _height: number
    public get height(): number {
        return this._height
    }
    constructor(input: string) {
        this.grid = input.split('\n').map(row => row.split(''))
        this._height = this.grid.length
        this._width = Math.max(...this.grid.map(row => row.length))
    }
    isInBounds(pos: Position): boolean {
        const { column, row } = pos
        return (
            row >= 0 && column >= 0 && row < this.height && column < this.width
        )
    }
    get(pos: Position): string {
        return this.grid[pos.row]?.[pos.column]
    }
    static from(board: Board): Board {
        return new Board(board.grid.map(row => row.join('')).join('\n'))
    }
    toString() {
        return this.grid.map(row => row.join('')).join('\n')
    }
}

export class MutableBoard extends Board {
    set(pos: Position, value: string) {
        this.grid[pos.row][pos.column] = value
    }
    public get height(): number {
        return this.grid.length
    }
    public get width(): number {
        return Math.max(...this.grid.map(row => row.length))
    }
    static from(board: Board): MutableBoard {
        return new MutableBoard(board.grid.map(row => row.join('')).join('\n'))
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

export const ALL_DIRECTIONS = [
    Direction.DOWN,
    Direction.DOWN_LEFT,
    Direction.DOWN_RIGHT,
    Direction.LEFT,
    Direction.RIGHT,
    Direction.UP,
    Direction.UP_LEFT,
    Direction.UP_RIGHT,
] as const

export interface Position {
    row: number
    column: number
}

export function isPosition(x: unknown): x is Position {
    return (
        typeof x === 'object' &&
        x !== null &&
        'row' in x &&
        'column' in x &&
        typeof x.row === 'number' &&
        typeof x.column === 'number'
    )
}

export function getBoard(input: string): Board {
    return new Board(input)
}

export function cloneBoard(board: Board): Board {
    return new Board(board.rows.join('\n'))
}

export function getAllRows(input: string): string[] {
    return input.split('\n')
}

/**
 * @deprecated slow & unused
 */
export function getAllColumns(input: string): string[] {
    const rows = getAllRows(input)
    const columns: string[] = []
    for (let i = 0; i < rows[0].length; i++) {
        columns.push(rows.map(row => row[i]).join(''))
    }
    return columns
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
