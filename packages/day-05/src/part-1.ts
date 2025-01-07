import type { Rule, Update } from './parse'

export function getMiddleCorrectUpdates({
    rules,
    updates,
}: { rules: Rule[]; updates: Update[] }) {
    const correctUpdates = updates.filter(update => update.check(rules))
    const middleCorrectUpdates = correctUpdates.reduce(
        (acc, cur) => acc + Number(cur.middle),
        0,
    )
    return middleCorrectUpdates
}
