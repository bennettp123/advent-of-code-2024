export function* sequence(start: number, end?: number) {
    if (end === undefined) {
        for (const i of sequence(0, start)) {
            yield i
        }
    } else {
        for (let i = start; i < end; i++) {
            yield i
        }
    }
}
