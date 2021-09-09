describe('Card', () => {
  let testCard

  beforeEach(() => {
    testCard = new Card("10", "H")
  })

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
      // for(let card_rank = 2; card_rank < 11; card_rank++) {
      //   card = new Card(card_rank.toString(), "D")
      //   expect(card.describeRank()).toEqual(card_rank.toString())
      // }
      [...Array(9)].forEach((_, card_rank) => {
        card = new Card(card_rank.toString(), "D")
        expect(card.describeRank()).toEqual(card_rank.toString())
      })
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
      new Array(0, 1, 2, 3).forEach((_, index) => {
        card = new Card("4", possible_suits[index])
        expect(card.describeSuit()).toEqual(possible_suit_names[index])
      })
    })
  })

  describe('#generateId', () => {
    it("returns a string in the form of 'rank_suit'", () => {
      expect(testCard.generateId()).toEqual('10_H')
    })
  })

  describe('#rank', () => {
    it('returns the rank of the card', () => {
      expect(testCard.rank()).toEqual("10")
    })
  })

  describe('#suit', () => {
    it('returns the suit of the card', () => {
      expect(testCard.suit()).toEqual("H")
    })
  })
})