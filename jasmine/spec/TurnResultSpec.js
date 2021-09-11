describe('TurnResult', () => {
  let testTurnResult, testGame, testPlayer1, testPlayer2, testPlayer3, receivedCards, requestedRank, cardSourceName

  beforeEach(() => {
    testPlayer1 = new Player('Player 1')
    testPlayer2 = new Player('Player 2')
    testPlayer3 = new Player('Player 3')
    requestedRank = '7'
    cardSourceName = testPlayer2.name()
    testGame = new Game([testPlayer1, testPlayer2])
    receivedCards = [new Card(requestedRank, 'H'), new Card(requestedRank, 'D')]
    testTurnResult = new TurnResult(testGame, 0, 1, requestedRank, receivedCards, cardSourceName)
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
      expect(testTurnResult._cardSourceName).toEqual(cardSourceName)
    })
  })

  describe('#cardSourceName', () => {
    it('returns the card source name', () => {
      expect(testTurnResult.cardSourceName()).toEqual(cardSourceName)
    })
  })
  
  describe('#game', () => {
    it('returns the game this turn results belongs to', () => {
      const dummy_game = new Game([new Player('Player 3')])
      testTurnResult._game = dummy_game
      expect(testTurnResult.game()).toEqual(dummy_game)
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
