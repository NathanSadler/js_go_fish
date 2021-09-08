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

    it('displays the cards in the hand of the first player', () => {
      player_list[0]._cards = [new Card("7", "D"), new Card("8", "H")]
      const view = new GameView(new Game(player_list))
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      expect(container.innerHTML).toContain("7 of Diamonds")
      expect(container.innerHTML).toContain("8 of Hearts")
    })

    it("doesn't display the cards of the players who are the first", () => {
      player_list[1]._cards = [new Card("9", "D"), new Card("10", "H")]
      const view = new GameView(new Game(player_list))
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      expect(container.innerHTML.includes("9 of Diamonds")).toBeFalse()
      expect(container.innerHTML.includes("10 of Hearts")).toBeFalse()
    })
  })
})