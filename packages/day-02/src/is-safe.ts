export const isSafe = (
    { allowUnsafeValues = 0 }: { allowUnsafeValues?: number } = {
        allowUnsafeValues: 0,
    },
) =>
    function isSafe(record: number[]) {
        const permutations = recordsFrom({
            record,
            allowedUnsafeValues: allowUnsafeValues,
        })

        for (const record of permutations) {
            if (isRecordSafe(record)) {
                return true
            }
        }

        return false
    }

function isRecordSafe(record: number[]) {
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

export function* recordsFrom({
    record,
    allowedUnsafeValues = 0,
}: { record: number[]; allowedUnsafeValues?: number }): Generator<number[]> {
    yield record
    if (allowedUnsafeValues > 0) {
        for (let index = 0; index < record.length; index++) {
            for (const oneShorterRecord of recordsFrom({
                record: record.filter((_, i) => i !== index),
                allowedUnsafeValues: allowedUnsafeValues - 1,
            })) {
                yield oneShorterRecord
            }
        }
    }
}
