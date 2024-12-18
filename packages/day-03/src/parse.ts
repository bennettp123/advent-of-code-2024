import assert from 'node:assert'

export function* parse(input: string) {
    let isEnabled = true
    for (const token of tokenize(input)) {
        const command = token.split('(')[0]
        const args = token
            .slice(command.length + 1, -1)
            .split(',')
            .map(Number)
        switch (command) {
            case 'mul':
                if (isEnabled) {
                    yield args.reduce((acc, value) => acc * value, 1)
                }
                break
            case 'do':
                isEnabled = true
                break
            case `don't`:
                isEnabled = false
                break
            default:
                assert.fail(`unrecognized command ${command}`)
                break
        }
    }
}

export function* tokenize(input: string): Generator<string> {
    const tokens = [/^mul\(\d+,\d+\)/, /^do\(\)/, /^don\'t\(\)/]
    let i = 0
    while (i < input.length) {
        const nextToken = tokens.find(token => input.slice(i).match(token))
        if (nextToken) {
            const match = input.slice(i).match(nextToken)
            assert(match?.length === 1, 'Expected only one match at a time!')
            assert(match[0], 'Expected tokenizer to produce non-empty token!')
            yield match[0]
            i += match[0].length
        } else {
            i += 1
        }
    }
}
