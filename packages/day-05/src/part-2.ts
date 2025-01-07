import type { Rule, Update } from './parse'

export function getIncorrectUpdates({
    rules,
    updates,
}: { rules: Rule[]; updates: Update[] }): Update[] {
    return updates.filter(update => !update.check(rules))
}
