describe('Card', () => {
  describe('#constructor', () => {
    
    it("sets the card's rank", () => {
      var card = new Card("4", "S")
      expect(card._rank).toEqual("4")
    })

    it("sets the card's suit", () => {
      var card = new Card("4", "D")
      expect(card._suit).toEqual("D")
    })
  })

  describe('#describe', () => {
    it("returns a string in the form 'rank' of 'suit's", () => {
      var card = new Card("4", "D")
      expect(card.describe()).toEqual('4 of Diamonds')
    })

    it("uses the name of the rank if the rank it has is just a letter", () => {
      var card = new Card("Q", "H")
      expect(card.describe()).toEqual("Queen of Hearts")
    })
  })

  describe('#describeRank', () => {
    it('returns the rank of the card unmodified if it is from 2 to 10', () => {
      for(let card_rank = 2; card_rank < 11; card_rank++) {
        card = new Card(card_rank.toString(), "D")
        expect(card.describeRank()).toEqual(card_rank.toString())
      }
    })

    it('returns the name of the rank if it is not a number', () => {
      card = new Card('Q', 'S')
      expect(card.describeRank()).toEqual('Queen')
    })
  })

  describe('#describeSuit', () => {
    it("returns the name of the card's suit", () => {
      const possible_suits = ['C', 'D', 'H', 'S']
      const possible_suit_names = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
      for(let i = 0; i < possible_suits.length; i++) {
        card = new Card("4", possible_suits[i])
        expect(card.describeSuit()).toEqual(possible_suit_names[i])
      }
    })
  })
})