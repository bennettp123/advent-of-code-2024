describe('index.mjs', () => {
    it('should resolve', async () => {
        expect(await import('./index.ts')).toBeDefined()
    })
})
