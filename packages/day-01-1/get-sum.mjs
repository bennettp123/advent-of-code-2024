export function getSum(a, b) {
    /** @type {number[]} */
    const _a = a.map(Number).sort((a, b) => a - b)
    /** @type {number[]} */
    const _b = b.map(Number).sort((a, b) => a - b)

    return _a.reduce((acc, value, index) => {
        return acc + Math.abs(value - _b[index])
    }, 0)
}
