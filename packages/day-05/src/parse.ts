export interface Update {
    readonly raw: string
    items: string[]
    middle: string
    check(rules: Rule[] | Rule): boolean
    fix(rules: Rule[] | Rule): Update
}

export interface Rule {
    readonly raw: string
    check(items: string[]): boolean
    fix(items: string[]): string[]
}

class _Rule implements Rule {
    public readonly first: string
    public readonly last: string
    constructor(public readonly raw: string) {
        const [first, last] = raw.split('|')
        this.first = first
        this.last = last
    }
    check(items: string[]) {
        const firstIndex = items.findIndex(value => value === this.first)
        if (firstIndex === -1) {
            return true
        }
        const lastIndex = items.findIndex(value => value === this.last)
        if (lastIndex === -1) {
            return true
        }
        return firstIndex < lastIndex
    }
    fix(items: string[]) {
        if (this.check(items)) {
            return [...items]
        }
        const correctIndex = items.findIndex(value => value === this.last)
        const incorrectIndex = items.findIndex(value => value === this.first)

        const part1 = items.slice(0, correctIndex)
        const part2 = [items[incorrectIndex], items[correctIndex]]
        const part3 = items.slice(correctIndex + 1, incorrectIndex)
        const part4 = items.slice(incorrectIndex + 1)

        return [...part1, ...part2, ...part3, ...part4]
    }
}

class _Update implements Update {
    public readonly raw: string
    public readonly items: string[]
    public readonly middle: string
    constructor(public readonly rawOrItems: string | string[]) {
        if (Array.isArray(rawOrItems)) {
            this.items = [...rawOrItems]
            this.raw = rawOrItems.join(',')
        } else {
            this.raw = rawOrItems
            this.items = rawOrItems.split(',')
        }
        const middleIndex = Math.floor(this.items.length / 2.0)
        if (this.items.length % 2 !== 1) {
            console.warn(
                `Update ${this.raw} has an even-numbered length; using index ${middleIndex} as the middle one`,
            )
        }
        this.middle = this.items[middleIndex]
    }

    check(rules: Rule[] | Rule) {
        if (Array.isArray(rules)) {
            return rules.every(rule => this.check(rule))
        }
        return rules.check(this.items)
    }

    fix(rules: Rule[] | Rule) {
        let newUpdate: Update = this
        const _rules = Array.isArray(rules) ? rules : [rules]
        for (const rule of _rules) {
            const newItems = rule.fix(newUpdate.items)
            newUpdate = new _Update(newItems)
        }

        if (!newUpdate.check(rules)) {
            newUpdate = newUpdate.fix(rules)
        }

        return newUpdate
    }
}

export function parse(input: string): { rules: Rule[]; updates: Update[] } {
    const rules: Rule[] = []
    const updates: Update[] = []

    let rulesProcessed = false
    for (const line of input.split('\n')) {
        if (line === '') {
            rulesProcessed = true
            continue
        }

        if (rulesProcessed) {
            updates.push(new _Update(line))
        } else {
            rules.push(new _Rule(line))
        }
    }
    return { rules, updates }
}
