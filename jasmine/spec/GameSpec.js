describe('Game', () => {
  describe('#constructor', () => {
    it("sets the players in the game", () => {
      const player1 = new Player('Player 1')
      const player2 = new Player('Player 2')
      expect(game._players.length).toEqual(2)
    })
  })
})