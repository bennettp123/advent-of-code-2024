/** @returns {number} */
export function getSum(/** @type {number[]} */ a, /** @type {number[]} */ b) {
    const _a = a.map(Number).sort((a, b) => a - b)
    const _b = b.map(Number).sort((a, b) => a - b)
    return _a.reduce((acc, value, index) => {
        return acc + Math.abs(value - _b[index])
    }, 0)
}
