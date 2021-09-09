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

  describe('#cards', () => {
    it('returns a list of the cards the player has', () => {
      card_list = [new Card("4", "D"), new Card("5", "D"), new Card("6", "D")]
      player._cards = card_list
      expect(player.cards()).toEqual(card_list)
    })
  })

  describe('#name', () => {
    it("returns the player's name", () => {
      expect(player.name()).toEqual('Player')
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

  describe('#setHand', () => {
    it("sets the cards in the player's hand", () => {
      expected_cards = [new Card("4", "H"), new Card("5", "H")]
      player.setHand(expected_cards)
      expect(player.cards()).toEqual(expected_cards)
    })
  })

  describe('#takeCard', () => {
    let test_card
    beforeEach(() => {
      test_card = new Card('7', 'D')
    })

    it('gives a card to the player', () => {
      player.takeCard(test_card)
      expect(player.cards()).toEqual([test_card])
    })

    it('returns the cards the player took', () => {
      expect(player.takeCard(test_card)).toEqual(test_card)
    })
  })
})