describe('GameView', () => {
  describe('displaying players in a game', () => {
    player_list = [new Player("John"), new Player("Bob")]

    it('lists the names of players in the game', () => {
      const view = new GameView(new Game(player_list))
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      expect(container.innerHTML).toContain("John")
      expect(container.innerHTML).toContain("Bob")
    })
  })
})