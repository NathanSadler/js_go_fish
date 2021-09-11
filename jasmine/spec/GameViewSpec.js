describe('GameView', () => {
  let player_list, view, container

  beforeEach(() => {
    document.getElementById('main').innerHTML = ''
    player_list = [new Player("John"), new Player("Bob")]
    player_list[0]._cards = [new Card("7", "D"), new Card("8", "H")]
    player_list[1]._cards = [new Card("9", "D"), new Card("10", "H"), new Card("J", "H")]
    
    view = new GameView(new Game(player_list))
    container = document.createElement('div')
    view.draw(container)
  })

  afterEach(() => {
    container.remove()
  })
  
  describe('displaying players in a game', () => {
    it('lists the names of players in the game', () => {
      document.getElementById('main').innerHTML = ''
      expect(container.innerHTML).toContain("John")
      expect(container.innerHTML).toContain("Bob")
    })

    it('displays the cards in the hand of the first player', () => {
      expect(container.innerHTML).toContain("7 of Diamonds")
      expect(container.innerHTML).toContain("8 of Hearts")
    })

    it("doesn't display the cards of the players who are not the first", () => {
      expect(container.innerHTML).not.toContain("9 of Diamonds")
      expect(container.innerHTML).not.toContain("10 of Hearts")
    })

    it('shows how many cards each player has', () => {
      expect(container.innerHTML).toContain('2 card(s)')
      expect(container.innerHTML).toContain('3 card(s)')
    })
  })

  describe('displaying turn results', () => {
    it('displays turn results', () => {
      document.getElementById('main').innerHTML = ''
      game = new Game(player_list)
      game.players()[0]._cards = [new Card('Q', 'S'), new Card('7', 'D')]
      game.players()[1]._cards = [new Card('7', 'H'), new Card('8', 'H')]
      game.deck()._cards = [new Card('A', 'S')]
      const view = new GameView(game)
      container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      view.playerSelectionBox().selectedIndex = 1
      view.cardSelectionBox().selectedIndex = 0
      view.submitButton().click()
      const message = 'John asked Bob for Qs and drew a card from the deck.'
      expect(container.innerHTML).toContain(message)
    })
  })
  

  describe('taking a turn', () => {
    let game, view, container

    beforeEach(() => {
      document.getElementById('main').innerHTML = ''
      game = new Game(player_list)
      game.players()[0]._cards = [new Card('Q', 'S'), new Card('7', 'D')]
      game.players()[1]._cards = [new Card('7', 'H'), new Card('8', 'H')]
      view = new GameView(game)
      container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      view.playerSelectionBox().selectedIndex = 1
      view.cardSelectionBox().selectedIndex = 1
      view.submitButton().click()
    })

    it('lets users take a turn', () => {
      expect(game.players()[0].cards()).toEqual([new Card('Q', 'S'), new Card('7', 'D'), new Card('7', 'H')])
      // container.remove()
    })

    
  })
})