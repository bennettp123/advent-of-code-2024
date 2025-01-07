export interface Update {
    readonly raw: string
    items: string[]
    middle: string
    check(rules: Rule[] | Rule): boolean
}

export interface Rule {
    readonly raw: string
    check(items: string[]): boolean
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
}

class _Update implements Update {
    public readonly items: string[]
    public readonly middle: string
    constructor(public readonly raw: string) {
        this.items = raw.split(',')
        const middleIndex = Math.floor(this.items.length / 2.0)
        if (this.items.length % 2 !== 1) {
            console.warn(
                `Update ${raw} has an even-numbered length; using index ${middleIndex} as the middle one`,
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
