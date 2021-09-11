describe('TurnResult', () => {
  let testTurnResult, testGame, testPlayer1, testPlayer2, testPlayer3, receivedCards, requestedRank, cardSource

  beforeEach(() => {
    testPlayer1 = new Player('Player 1')
    testPlayer2 = new Player('Player 2')
    testPlayer3 = new Player('Player 3')
    requestedRank = '7'
    cardSource = testPlayer2
    testGame = new Game([testPlayer1, testPlayer2])
    receivedCards = [new Card(requestedRank, 'H'), new Card(requestedRank, 'D')]
    testTurnResult = new TurnResult(testGame, 0, 1, requestedRank, receivedCards, cardSource)
  })

  describe('#constructor', () => {
    it('sets the game', () => {
      expect(testTurnResult._game).toEqual(testGame)
    })

    it('sets the requesting player index', () => {
      expect(testTurnResult._requestingPlayerIndex).toEqual(0)
    })

    it('sets the requested player index', () => {
      expect(testTurnResult._requestedPlayerIndex).toEqual(1)
    })

    it('sets the requested rank', () => {
      expect(testTurnResult._requestedRank).toEqual(requestedRank)
    })

    it('sets the received cards', () => {
      expect(testTurnResult._receivedCards).toEqual(receivedCards)
    })

    it('sets the card source name', () => {
      expect(testTurnResult._cardSource).toEqual(cardSource)
    })
  })

  describe('#cardSource', () => {
    it('returns the card source', () => {
      expect(testTurnResult.cardSource()).toEqual(cardSource)
    })
  })

  describe('#cardSourceName', () => {
    it('returns the name of the player if the source is a player', () => {
      expect(testTurnResult.cardSourceName()).toEqual(testPlayer2.name())
    })

    it('returns the raw card source if it is not a player', () => {
      testTurnResult._cardSource = 'the deck'
      expect(testTurnResult.cardSourceName()).toEqual('the deck')
    })
  })
  
  describe('#game', () => {
    it('returns the game this turn results belongs to', () => {
      const dummy_game = new Game([new Player('Player 3')])
      testTurnResult._game = dummy_game
      expect(testTurnResult.game()).toEqual(dummy_game)
    })
  })

  describe('#message', () => {
    describe('the asking player correctly asking another for a card of a specific rank', () => {
      it("returns a message in the format '<asking player> asked <asked player> for <rank>s and got <number of won cards> of them.", () => {
        const message = 'Player 1 asked Player 2 for 7s and got 2 of them.'
        expect(testTurnResult.message()).toEqual(message)
      })
    })

    describe('the asked player not having the requested rank', () => {
      beforeEach(() => {
        testTurnResult._cardSource = "the deck"
      })

      xdescribe('the asking player draws one with that rank from the deck', () => {
        it("returns a message in the format '<asking player> asked <asked player> for <rank>s and drew one from the deck.", () => {
          testTurnResult._receivedCards = [new Card('7', 'C')]
          const message = 'Player 1 asked Player 2 for 7s and drew one from the deck.'
          expect(testTurnResult.message()).toEqual(message)
        })
      })
  
      describe('the asking player drawing a card with a different rank', () => {
        it("returns a message in the format '<asking player> asked <asked player> for <ranks> and drew a card from the deck.'", () => {
          testTurnResult._receivedCards = [new Card('8', 'C')]
          const message = 'Player 1 asked Player 2 for 7s and drew a card from the deck.'
          expect(testTurnResult.message()).toEqual(message)
        })
      })

      describe('the asking player not getting any cards', () => {
        it("returns a message in the format '<asking player> asked <asked player> for <rank>s but didn't get any cards.'", () => {
          testTurnResult._receivedCards = []
          const message = "Player 1 asked Player 2 for 7s but didn't get any cards."
          expect(testTurnResult.message()).toEqual(message)
        })
      })
    })
  })

  describe('#requestedPlayer', () => {
    it('returns the requested player', () => {
      expect(testTurnResult.requestedPlayer()).toEqual(testPlayer2)
    })
  })

  describe('#requestedPlayerIndex', () => {
    it('returns the requested player index', () => {
      testTurnResult._requestedPlayerIndex = 99
      expect(testTurnResult.requestedPlayerIndex()).toEqual(99)
    })
  })

  describe('#requestingPlayer', () => {
    it('returns the requesting player', () => {
      expect(testTurnResult.requestingPlayer()).toEqual(testPlayer1)
    })
  })

  describe('#requestingPlayerIndex', () => {
    it('returns the requesting player index', () => {
      testTurnResult._requestingPlayerIndex = 1
      expect(testTurnResult.requestingPlayerIndex()).toEqual(1)
    })
  })

  describe('#receivedCards', () => {
    it('returns the received cards', () => {
      testTurnResult._receivedCards = [new Card('8', 'H')]
      expect(testTurnResult.receivedCards()).toEqual([new Card('8', 'H')])
    })
  })

  describe('#requestedRank', () => {
    it('returns the requested rank', () => {
      testTurnResult._requestedRank = 'K'
      expect(testTurnResult.requestedRank()).toEqual('K')
    })
  })
})
