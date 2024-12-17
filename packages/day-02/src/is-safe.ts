export function isSafe(record: number[]) {
    if (!isAscending(record) && !isDescending(record)) {
        return false
    }

    return record.every((value, index, array) => {
        if (index === 0) {
            return true
        }
        const previous = array[index - 1]
        const difference = Math.abs(value - previous)
        return difference >= 1 && difference <= 3
    })
}

export function isAscending(record: number[]) {
    return record.every((value, index, array) => {
        if (index === 0) {
            return true
        }
        const previous = array[index - 1]
        return value >= previous
    })
}

export function isDescending(record: number[]) {
    return isAscending(record.reverse())
}
