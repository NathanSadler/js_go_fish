describe('GameView', () => {
  let player_list, view, container

  beforeEach(() => {
    document.getElementById('main').innerHTML = ''
    player_list = [new Player("John"), new Player("Bob")]
    player_list[0]._cards = [new Card("7", "D"), new Card("9", "H")]
    player_list[1]._cards = [new Card("9", "D"), new Card("10", "H"), new Card("J", "H")]
    
    view = new GameView(new Game(player_list))
    view._game.deck().setCards([new Card('8', 'H')])
    container = document.createElement('div')
    view.draw(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe('game over screen', () => {
    let game

    beforeEach(() => {
      container.remove()
      document.getElementById('main').innerHTML = ''
      player_list = [new Player("John"), new Player("Bob")]
      player_list[0]._score = 3
      player_list[1]._score = 5
      game = new Game(player_list)
      container = document.createElement('div')
    })

    it('appears when the game is over', () => {
      player_list.forEach(player => player.setHand([]))
      game.deck()._cards = []
      view = new GameView(game)
      view.draw(container)
      expect(container.innerHTML).toContain("Game Over")
    })

    it('displays the score of each player', () => {
      player_list.forEach(player => player.setHand([]))
      game.deck()._cards = []
      view = new GameView(game)
      view.draw(container)
      expect(container.innerHTML).toContain("John- 3 book(s)")
      expect(container.innerHTML).toContain("Bob- 5 book(s)")
    })

    it('does not appear when the game is not over', () => {
      player_list.forEach(player => player.setHand([new Card('7', 'S')]))
      view = new GameView(game)
      view.draw(container)
      expect(container.innerHTML).not.toContain("Game Over")
    })
  })

  it('displays the number of cards in the deck', () => {
    expect(container.innerHTML).toContain('The deck has 1 card(s).')
  })
  
  describe('displaying players in a game', () => {
    it('lists the names of players in the game', () => {
      // document.getElementById('main').innerHTML = ''
      expect(container.innerHTML).toContain("John")
      expect(container.innerHTML).toContain("Bob")
    })

    it('displays the cards in the hand of the first player', () => {
      expect(container.innerHTML).toContain("7 of Diamonds")
      expect(container.innerHTML).toContain("9 of Hearts")
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
      document.getElementById('main').appendChild(container)
      view.draw(container)
      view.playerSelectionBox().selectedIndex = 0
      view.cardSelectionBox().selectedIndex = 0
      view.submitButton().click()
      const message = 'John asked Bob for Qs and drew a card from the deck.'
      expect(document.body.innerHTML).toContain(message)
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
      view.playerSelectionBox().selectedIndex = 0
      view.cardSelectionBox().selectedIndex = 1
      view.submitButton().click()
    })

    afterEach(() => {
      container.remove()
    })

    it('lets users take a turn', () => {
      expect(game.players()[0].cards()).toEqual([new Card('Q', 'S'), new Card('7', 'D'), new Card('7', 'H')])
      container.remove()
    })

    it('does not give players the option to ask themselves for a card', () => {
      const playerNames = Array.from(view.playerSelectionBox().children).map(playerOption => playerOption.innerText)
      expect(playerNames).not.toContain(game.players()[0].name())
    })

  })
})