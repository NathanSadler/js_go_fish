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

  describe('#getIndexOfPlayer', () => {
    it('returns the index of a given player', () => {
      expect(game.getIndexOfPlayer(player2)).toEqual(1)
    })

    it('returns -1 if the given player is not in the game', () => {
      const player3 = new Player('Player 3')
      expect(game.getIndexOfPlayer(player3)).toEqual(-1)
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

  describe('#playTurn', () => {
    beforeEach(() => {
      player1.setHand([new Card("4", "D"), new Card("5", "D"), new Card("7", "D"), new Card("8", "D")])
      player2.setHand([new Card("4", "S"), new Card("4", "C"), new Card("4", "H"), new Card("6", "D")])
      game._deck._cards = [new Card("8", "S"), new Card("9", "S"), new Card('10', 'S')]
    })

    describe('a user correctly asking someone for a card of a specific rank', () => {
      beforeEach(() => game.playTurn(0, 1, '4'))

      it('takes the cards of the requested rank from whoever got asked', () => {
        expect(game.players()[1].cards()).toEqual([new Card("6", "D")])
      })

      it('gives the cards that were taken from the requested player to the requesting player', () => {
        [new Card("4", "S"), new Card("4", "C"), new Card("4", "H")].forEach(card => 
          expect(player1.cards()).toContain(card))
      })

      it("doesn't increment the turn player index", () => {
        expect(game.turnPlayerIndex()).toEqual(0)
      })

      it("doesn't make the player draw a card", () => {
        expect(player1.cards()).not.toContain(new Card('8', 'S'))
      })
    })

    describe('a user incorrectly asking someone for a card of a specific rank', () => {
      it('makes the asking player draw a card from the deck', () => {
        game.playTurn(0, 1, '7')
        expect(player1.cards()).toContain(new Card("8", "S"))
      })

      it("doesn't increment the turn player index if the asking player gets a card of the rank they asked for from the deck", () => {
        game.playTurn(0, 1, '8')
        expect(game.turnPlayerIndex()).toEqual(0)
      })

      it("increments the turn player index if the asking player doesn't get a card of the rank they asked for from the deck", () => {
        game.playTurn(0, 1, '7')
        expect(game.turnPlayerIndex()).toEqual(1)
      })
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

  describe('#turnPlayer', () => {
    it('returns the player whose turn it is', () => {
      game.incrementTurnPlayerIndex()
      expect(game.turnPlayer()).toEqual(player2)
    })
  })

  describe('#turnPlayerIndex', () => {
    it('returns the turn player index of the game', () => {
      expect(game.turnPlayerIndex()).toEqual(0)
    })
  })

  describe('#incrementTurnPlayerIndex', () => {
    it('increments the turn player index', () => {
      game.incrementTurnPlayerIndex()
      expect(game.turnPlayerIndex()).toEqual(1)
    })

    it('resets the turn player index to 0 if the index would go out of bounds', () => {
      Array.from(Array(2)).forEach((_, i) => game.incrementTurnPlayerIndex())
      expect(game.turnPlayerIndex()).toEqual(0)
    })

    it('returns the new turn player index', () => {
      expect(game.incrementTurnPlayerIndex()).toEqual(1)
    })

    it('makes a bot player take their turn', () => {
      botPlayer = new BotPlayer('Bot Player')
      botPlayer._cards = [new Card('7', 'H')]
      game.addPlayer(botPlayer)
      game._turnPlayerIndex = 1
      game.incrementTurnPlayerIndex()
      expect(botPlayer.cards()).toEqual([new Card('7', 'H'), new Card('7', 'D')])
    })
  })
});