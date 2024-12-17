/** @type {number[]} */
export function getSimilarityScore(
    /** @type {number[]} */ a,
    /** @type {number[]} */ b,
) {
    let sum = 0
    for (const num of a) {
        const matches = b.filter(n => n === num)
        const score = num * matches.length
        sum += score
    }
    return sum
}

export default getSimilarityScore
