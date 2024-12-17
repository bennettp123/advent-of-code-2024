describe('index.mjs', () => {
  it('should resolve', async () => {
    expect(await import('./index.mjs')).toBeDefined()
  })
})
