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

  describe('#cardCount', () => {
    it('returns the number of cards the player has', () => {
      card_list = [new Card("4", "D"), new Card("5", "D"), new Card("6", "D")]
      player.setHand(card_list)
      expect(player.cardCount()).toEqual(3)
    })
  })

  describe('#cards', () => {
    it('returns a list of the cards the player has', () => {
      card_list = [new Card("4", "D"), new Card("5", "D"), new Card("6", "D")]
      player._cards = card_list
      expect(player.cards()).toEqual(card_list)
    })
  })

  describe('#countCardsWithRank', () => {
    it('returns the number of cards a player has with a given rank', () => {
      player._cards = [new Card("4", "D"), new Card("4", "S"), new Card("5", "D")]
      expect(player.countCardsWithRank('4')).toEqual(2)
      expect(player.countCardsWithRank('5')).toEqual(1)
      expect(player.countCardsWithRank('K')).toEqual(0)
    })
  })

  describe('#equals', () => {
    let comparisonPlayer

    beforeEach(() => {
      comparisonPlayer = new Player('Player')
      player._cards = [new Card('7', 'H'), new Card('8', 'H')]
      comparisonPlayer._cards = [new Card('7', 'H'), new Card('8', 'H')]
    })

    it('is true if the names and cards of both players are the same', () => {
      expect(player.equals(comparisonPlayer)).toBeTrue()
    })

    it('is false if the names of both players are not the same', () => {
      comparisonPlayer._name = 'Other Player'
      expect(player.equals(comparisonPlayer)).toBeFalse()
    })

    it('is false if the cards of both players are not the same', () => {
      comparisonPlayer._cards = [new Card('9', 'H')]
      expect(player.equals(comparisonPlayer)).toBeFalse()
    })
  })

  describe('#getCardsWithRank', () => {
    it("returns an array of the player's cards that have a specified rank", () => {
      player._cards = [new Card("4", "D"), new Card("4", "S"), new Card("5", "D")]
      expect(player.getCardsWithRank('4')).toEqual([new Card("4", "D"), new Card("4", "S")])
      expect(player.getCardsWithRank('J')).toEqual([])
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

  describe('#score', () => {
    it('returns the score of the player', () => {
      expected_score = 4
      player._score = expected_score
      expect(player.score()).toEqual(expected_score)
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

    describe('the player taking null', () => {
      it("doesn't add anything to the player's hand", () => {
        player.takeCard(null)
        expect(player.cardCount()).toEqual(0)
      })

      it("returns an empty array", () => {
        expect(player.takeCard(null)).toEqual([])
      })
    })

    it('gives a card to the player', () => {
      player.takeCard(test_card)
      expect(player.cards()).toEqual([test_card])
    })

    it('returns the cards the player took', () => {
      expect(player.takeCard(test_card)).toEqual(test_card)
    })

    describe('getting a book', () => {
      beforeEach(() => {
        ['H', 'C', 'S'].forEach(suit => player.takeCard(new Card('7', suit))) 
        player.takeCard(test_card)
      })

      it('increases the score of the player', () => {
        expect(player.score()).toEqual(1)
      })

      it("removes the cards that make up the book from the player's hand", () => {
        expect(player.cards()).toEqual([])
      })
    })
  })
})