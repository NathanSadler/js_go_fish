describe('Game', () => {
  let player1, player2, player_list, game

  beforeEach(() => {
    player1 = new Player('Player 1')
    player2 = new Player('Player 2')
    player_list = [player1, player2]
    game = new Game(player_list)
  })

  describe('#constructor', () => {
    it("sets the players in the game", () => {
      expect(game._players).toEqual(player_list)
    })

    it("sets the minimum number of players", () => {
      const game = new Game([new Player('Hello World')], 3)
      expect(game._minimum_player_count).toEqual(3)
    })
  })

  describe('#addPlayer', () => {
    it('adds a player to the game', () => {
      const game = new Game([new Player('Player 1')])
      game.addPlayer(new Player('Player 2'))
      expect(game.playerCount()).toEqual(2)
    })
  })

  describe('#dealCards', () => {
    let game, player_list

    beforeEach(() => {
      player_list = [...Array(4)].map((_, index) => {return new Player(`Player ${index}`)})
      game = new Game(player_list)
    })
    
    it('gives everyone 7 cards if there are 3 or fewer players', () => {
      const player1 = new Player('Player 1')
      const player2 = new Player('Player 2')
      const player_list = [player1, player2]
      const game = new Game(player_list)
      game.dealCards()
      player_list.forEach((player) => {expect(player.cards().length).toBe(Game.starting_card_count_for_few_players)})
    })

    it('gives everyone 5 cards if there are 4 or more players', () => {
      const game = new Game(player_list)
      game.dealCards()
      player_list.forEach((player) => {expect(player.cards().length).toBe(Game.starting_card_count_for_many_players)})
    })

    it('removes the dealt cards from the deck', () => {
      game.dealCards()
      expect(game._deck._cards.length).toEqual(Deck.default_deck_size - (Game.starting_card_count_for_many_players * 4))
    })
  })

  describe('#deck', () => {
    it('returns the deck of the game', () => {
      expect(game.deck()).toEqual(game._deck)
    })
  })

  describe('#minimum_player_count', () => {
    it("returns the game's minimum number of players", () => {
      const game = new Game([new Player('Hello World')], 3)
      expect(game.minimum_player_count()).toEqual(3)
    })
  })

  describe('#players', () => {
    it('returns the list of the players in the game', () => {
      expect(game.players()).toEqual(player_list)
    })
  })

  describe('#playerCount', () => {
    it('returns the number of players in the game', () => {
      const game = new Game([new Player('Foo'), new Player('Bar')])
      expect(game.playerCount()).toEqual(2)
    })
  })

  describe('#start', () => {
    it('shuffles the deck', () => {
      const game = new Game([new Player('Hello World')], 5)
      game.start()
      expected_cards_in_deck = Deck.default_deck_size - (game.playerCount() * Game.starting_card_count_for_many_players)
      expect(game.deck().cardsLeft()).toEqual(expected_cards_in_deck)
    })

    it('deals the cards', () => {
      game.start()
      expect(game.players()[0].cards().length).toBeGreaterThan(0)
      expect(game.deck().cardsLeft()).toBeLessThan(Deck.default_deck_size)
    })

    describe('without enough players', () => {
      it('adds bot players until there are enough players', () => {
        const game = new Game([new Player('hello world')], 3)
        game.start()
        expect(game.playerCount()).toEqual(3)
      })
    })

    xit("doesn't start if it has already started once", () => {

    })
  })

  describe('#turnPlayerIndex', () => {
    it('returns the turn player index of the game', () => {
      expect(game.turnPlayerIndex()).toEqual(0)
    })
  })
});