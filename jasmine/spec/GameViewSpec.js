describe('GameView', () => {
  let player_list

  beforeEach(() => {
    player_list = [new Player("John"), new Player("Bob")]
  })
  

  describe('displaying players in a game', () => {
    it('lists the names of players in the game', () => {
      document.getElementById('main').innerHTML = ''
      const view = new GameView(new Game(player_list))
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      expect(container.innerHTML).toContain("John")
      expect(container.innerHTML).toContain("Bob")
      container.remove()
    })

    it('displays the cards in the hand of the first player', () => {
      document.getElementById('main').innerHTML = ''
      player_list[0]._cards = [new Card("7", "D"), new Card("8", "H")]
      const view = new GameView(new Game(player_list))
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      expect(container.innerHTML).toContain("7 of Diamonds")
      expect(container.innerHTML).toContain("8 of Hearts")
      container.remove()
    })

    it("doesn't display the cards of the players who are not the first", () => {
      document.getElementById('main').innerHTML = ''
      player_list[1]._cards = [new Card("9", "D"), new Card("10", "H")]
      const view = new GameView(new Game(player_list))
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      expect(container.innerHTML).not.toContain("9 of Diamonds")
      expect(container.innerHTML).not.toContain("10 of Hearts")
      container.remove()
    })
  })

  describe('taking a turn', () => {
    it('lets users take a turn', () => {
      document.getElementById('main').innerHTML = ''
      game = new Game(player_list)
      game.players()[0]._cards = [new Card('7', 'D')]
      game.players()[1]._cards = [new Card('7', 'H'), new Card('8', 'H')]
      const view = new GameView(game)
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      
      expect(game.players()[0].cards()).toEqual([new Card('7', 'D')])

      view.playerButton(1).click()
      view.cardButton("7_D").click()
      view.submitButton().click()
      
      expect(game.players()[0].cards()).toEqual([new Card('7', 'D'), new Card('7', 'H')])
      container.remove()
    })

    
  })
})