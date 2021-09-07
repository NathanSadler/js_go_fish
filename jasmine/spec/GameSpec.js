describe('Game', () => {
  describe('#constructor', () => {
    it("sets the players in the game", () => {
      const player1 = new Player('Player 1')
      const player2 = new Player('Player 2')
      const player_list = [player1, player2]
      const game = new Game(player_list)
      expect(game._players).toEqual(player_list)
    })

    it("sets the minimum number of players", () => {
      const game = new Game([], 3)
      expect(game._minimum_player_count).toEqual(3)
    })
  })

  describe('#players', () => {
    it('returns the list of the players in the game', () => {
      const player1 = new Player('Player 1')
      const player2 = new Player('Player 2')
      const player_list = [player1, player2]
      const game = new Game(player_list)
      expect(game.players()).toEqual(player_list)
    })
  })

  describe('#minimum_player_count', () => {
    it("returns the game's minimum number of players", () => {
      const game = new Game([], 3)
      expect(game.minimum_player_count()).toEqual(3)
    })
  })
})