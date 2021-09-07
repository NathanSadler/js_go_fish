describe('GameView', () => {
  describe('listing players in a game', () => {
    it('lists the names of players in the game', () => {
      player_list = [new Player("John"), new Player("Bob")]
      const view = new GameView(new Game(player_list))
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      expect(container.innerHTML).toContain("John")
      expect(container.innerHTML).toContain("Bob")
    })
  })
})