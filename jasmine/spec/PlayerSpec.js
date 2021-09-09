describe('Player', () => {
  let player

  beforeEach(() => {
    player = new Player('Player')
  })

  describe('#constructor', () => {
    it("sets the player's name", () => {
      expect(player._name).toEqual('Player')
    })
  })

  describe('#name', () => {
    it("returns the player's name", () => {
      expect(player.name()).toEqual('Player')
    })
  })

  describe('#cards', () => {
    it('returns a list of the cards the player has', () => {
      card_list = [new Card("4", "D"), new Card("5", "D"), new Card("6", "D")]
      player._cards = card_list
      expect(player.cards()).toEqual(card_list)
    })
  })

  describe('#removeCardsWithRank', () => {
    beforeEach(() => {
      const card_list = [new Card("4", "D"), new Card('4', 'H'), new Card("5", "D"), new Card("6", "D")]
      player._cards = card_list
    })

    it("removes cards with a specific rank from the player's hand", () => {
      const expected_cards = [new Card("5", "D"), new Card("6", "D")]
      player.removeCardsWithRank("4")
      expect(player.cards()).toEqual(expected_cards)
    })

    it("returns an array of the cards that got removed from the player's hand", () => {
      const expected_cards = [new Card("4", "D"), new Card('4', 'H')]
      expect(player.removeCardsWithRank("4")).toEqual(expected_cards)
    })
  })

  describe('#takeCard', () => {
    it('gives a card to the player', () => {
      player.takeCard(new Card("7", "D"))
      expect(player.cards()).toEqual([new Card("7", "D")])
    })
  })
})