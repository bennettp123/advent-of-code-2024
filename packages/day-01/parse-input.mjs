/** @returns {[number[], number[]]} */
export function parseInput(/** @type {string} */ input) {
    const lines = input.split('\n').filter(Boolean)

    const [first, second] = lines.reduce(
        ([firstAcc, secondAcc], line) => {
            const [first, second] = line.split(/\s+/).map(Number)
            return [
                [...firstAcc, first],
                [...secondAcc, second],
            ]
        },
        [[], []],
    )

    return [first, second]
}

export default parseInput
