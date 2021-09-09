describe('BotPlayer', () => {
  let testBot

  beforeEach(() => {
    testBot = new BotPlayer('Test Bot Player')
  })

  describe('#selectRankToAskFor', () => {
    beforeEach(() => testBot._cards = [new Card('7', 'D'), new Card('4', 'H')])
    it('returns the rank of a randomly selected card in the hand of the bot player', () => {
      expect(testBot.cards().map(card => card.rank())).toContain(testBot.selectRankToAskFor())
    })
  })
})