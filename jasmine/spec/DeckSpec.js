describe('Deck', () => {
  describe('#constructor', () => {
    it('creates a deck of 52 cards', () => {
      deck = new Deck()
      expect(deck._cards.length).toBe(52)
    })
  })

  describe('#cardsInDeck', () => {
    it('returns the number of cards in the deck', () => {
      deck = new Deck()
      deck.removeCard()
      expect(deck.cardsInDeck()).toEqual(Deck.default_deck_size - 1)
    })
  })

  describe('#removeCard', () => {
    it('removes the top card from the deck', () => {
      deck = new Deck([new Card("4", "D"), new Card("7", "S"), new Card("9", "D")])
      deck.removeCard()
      expect(deck._cards.length).toBe(2)
    })

    it('returns the card that was removed', () => {
      deck = new Deck([new Card("4", "D"), new Card("7", "S"), new Card("9", "D")])
      expect(deck.removeCard()).toEqual(new Card("4", "D"))
    })
  })
})