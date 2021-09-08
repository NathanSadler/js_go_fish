describe('Deck', () => {
  describe('#constructor', () => {
    it('creates a deck of 52 cards', () => {
      deck = new Deck()
      expect(deck._cards.length).toBe(52)
    })
  })
})