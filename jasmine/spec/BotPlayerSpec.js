describe('BotPlayer', () => {
  let testBot

  beforeEach(() => {
    testBot = new BotPlayer('Test Bot Player')
  })

  describe('#selectPlayerToAskIndex', () => {
    let game, player1, player2

    beforeEach(() => {
      player1 = new Player('Player 1')
      player2 = new Player('Player 2')
      player1._cards = [new Card('A', 'H')]
      player2._cards = [new Card('2', 'H')]
      testBot._cards = [new Card('3', 'H')]
      game = new Game([player1, player2, testBot])
    })

    it('selects the first valid player', () => {
      expect(testBot.selectPlayerToAskIndex(game)).toEqual(0)
    })

    it('never selects itself', () => {
      game._players[0] = testBot
      game._players[2] = player1
      expect(testBot.selectPlayerToAskIndex(game)).toEqual(1)
    })

    it("won't select a player that doesn't have any cards", () => {
      player1._cards = []
      expect(testBot.selectPlayerToAskIndex(game)).toEqual(1)
    })
  })

  describe('#selectRankToAskFor', () => {
    beforeEach(() => testBot._cards = [new Card('7', 'D'), new Card('4', 'H')])
    it('returns the rank of a randomly selected card in the hand of the bot player', () => {
      expect(testBot.cards().map(card => card.rank())).toContain(testBot.selectRankToAskFor())
    })
  })
})