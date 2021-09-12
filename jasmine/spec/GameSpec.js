describe('Game', () => {
  let player1, player2, player_list, game

  beforeEach(() => {
    player1 = new Player('Player 1')
    player2 = new Player('Player 2')
    player1.setHand([new Card("4", "D"), new Card("5", "D"), new Card("7", "D"), new Card("8", "D")])
    player2.setHand([new Card("4", "S"), new Card("4", "C"), new Card("4", "H"), new Card("6", "D")])
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

  describe('#isOver', () => {
    it('is true if no players have any cards in their hand and there are no cards in the deck', () => {
      [player1, player2].forEach(player => player.setHand([]))
      game.deck()._cards = []
      expect(game.isOver()).toBeTrue()
    })

    it('is false if ANY players still have cards in their hands', () => {
      player1.setHand([])
      game.deck()._cards = []
      expect(game.isOver()).toBeFalse()
    })

    it('is false if there are any cards in the deck', () => {
      [player1, player2].forEach(player => player.setHand([]))
      game.deck()._cards = [new Card("J", "8")]
      expect(game.isOver()).toBeFalse()
    })
  })

  describe('#lastTurnResult', () => {
    it('returns the most recent turn result of the game', () => {
      const sampleResult = new TurnResult(game, 1, 0, '6', [new Card('Q', 'H')], 'the deck')
      game._turnResults.push(new TurnResult(game, 0, 1, '8', [new Card('8', 'H')], 'the deck'))
      game._turnResults.push(sampleResult)
      expect(game.lastTurnResult()).toEqual(sampleResult)
    })
  })

  describe('#minimum_player_count', () => {
    it("returns the game's minimum number of players", () => {
      const game = new Game([new Player('Hello World')], 3)
      expect(game.minimum_player_count()).toEqual(3)
    })
  })

  describe('#nextPlay', () => {
    beforeEach(() => {
      game._turnPlayerIndex = 0
    })

    it("doesn't do anything if the game is over", () => {
      // makes game over
      [player1, player2].forEach(player => player.setHand([]))
      game.deck()._cards = []

      // puts game in state where it would normally increment the turn player index
      game._turnResults.push(new TurnResult(game, 1, 2, '8', [], 'the deck'))

      game.nextPlay()
      expect(game.turnPlayerIndex()).toEqual(0)
    })

    describe('a player getting the rank of card they asked for', () => {
      it('does not increment the turn player index', () => {
        game._turnResults.push(new TurnResult(game, 1, 2, '8', [new Card('8', 'H')], 'the deck'))
        game.nextPlay()
        expect(game.turnPlayerIndex()).toEqual(0)
      })
    })

    describe('a player not getting the rank of card they asked for', () => {
      it('increments the turn player index', () => {
        game._turnResults.push(new TurnResult(game, 1, 2, '8', [new Card('9', 'H')], 'the deck'))
        game.nextPlay()
        expect(game.turnPlayerIndex()).toEqual(1)
      })
    })

    describe('the upcoming turn player not having any cards while there are still cards in the deck', () => {
      let player3

      beforeEach(() => {
        player3 = new BotPlayer('Player 3')
        player3.setHand([])
        game.addPlayer(player3)
        game._turnPlayerIndex = 1
        game.deck().setCards([new Card('A', 'H')])
        game._turnResults.push(new TurnResult(game, 1, 2, '3', [new Card('K', 'S')], 'the deck'))
      })

      it('draws a card from the deck and gives it to the new turn player', () => {
        game.nextPlay()
        expect(player3.cards()).toEqual([new Card('A', 'H')])
      })

      it('moves on to the next valid player', () => {
        game.nextPlay()
        expect(game.turnPlayerIndex()).toEqual(0)
      })

      it('will draw a card and move on to the next player for multiple players in a row', () => {
        const player4 = new BotPlayer('Player4')
        game.deck()._cards.push(new Card('A', 'D'))
        game.addPlayer(player4)
        game.nextPlay()
        expect(game.turnPlayerIndex()).toEqual(0)
        expect(player3.cards()).toEqual([new Card('A', 'H')])
        expect(player4.cards()).toEqual([new Card('A', 'D')])
      })

      it('saves the appropriate turn result', () => {
        game.nextPlay()
        const sampleResult = new TurnResult(game, 2, -1, null, [new Card('A', 'H')], 'the deck')
        expect(game.lastTurnResult()).toEqual(sampleResult)
      })
    })

    describe('it being the turn of a bot player', () => {
      let botPlayer

      beforeEach(() => {
        botPlayer = new BotPlayer('Bot Player')
        botPlayer._cards = [new Card('7', 'H')]
        game.addPlayer(botPlayer)
        game._turnResults.push(new TurnResult(game, 1, 2, '3', [new Card('4', 'S')], 'the deck'))
        game.deck()._cards = [new Card('Q', 'C')]
        game._turnPlayerIndex = 1
        game.nextPlay()
      })

      it('makes a bot player take their turn', () => {
        expect(botPlayer.cards()).toEqual([new Card('7', 'H'), new Card('7', 'D'), new Card('Q', 'C')])
      })

      it('properly sets the turn player index when a bot is finished with their turn', () => {
        expect(game.turnPlayerIndex()).toEqual(0)
      })
    })
  })

  describe('#setTurnPlayerIndexToNextValidPlayer', () => {
    let player3

    beforeEach(() => {
      player3 = new Player('Player 3')
      player3.setHand([new Card('Q', 'H')])
      game.addPlayer(player3)
      game._turnPlayerIndex = 0
    })

    describe('there are still cards in the deck', () => {
      it("sets the turn player index to the next player's", () => {
        game.deck()._cards = [new Card('7', 'D')]
        game.setTurnPlayerIndexToNextValidPlayer()
        expect(game.turnPlayerIndex()).toEqual(1)
      })
    })

    describe('there are no more cards in the deck', () => {
      it('sets the turn player index to the index of the next player that still has cards', () => {
        game.deck()._cards = []
        player2.setHand([])
        game.setTurnPlayerIndexToNextValidPlayer()
        expect(game.turnPlayerIndex()).toEqual(2)
      })
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
      game._deck._cards = [new Card("8", "S"), new Card("9", "S"), new Card('10', 'S')]
    })

    it('saves the results of the turn', () => {
      game.players()[0]._cards.push(new Card('6', 'H'))
      game.playTurn(0, 1, '6')
      const result = new TurnResult(game, 0, 1, '6', [new Card('6', 'D')], player2)
      expect(game.turnResults()).toContain(result)
    })

    describe('a user correctly asking someone for a card of a specific rank', () => {
      beforeEach(() => {
        game.players()[0]._cards.push(new Card('6', 'H'))
        game.playTurn(0, 1, '6')
      })

      it('takes the cards of the requested rank from whoever got asked', () => {
        expect(game.players()[1].cards()).not.toContain(new Card('6', 'D'))
      })

      it('gives the cards that were taken from the requested player to the requesting player', () => {
        [new Card("6", "H"), new Card("6", "D")].forEach(card => 
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

    describe('what happens when a player loses all of their cards because they won a book', () => {
      beforeEach(() => {
        player1.setHand([new Card('4', 'D')])
        game.playTurn(0, 1, '4')
      })

      it('moves the game on to the next player', () => {
        expect(game.turnPlayerIndex()).toEqual(1)
      })

      it('draws a card for the player that won the book', () => {
        expect(player1.cards()).toEqual([new Card('8', 'S')])
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

  describe('#turnResults', () => {
    it("returns this game's turn results", () => {
      result = new TurnResult(game, 0, 1, '4', [new Card("4", "S"), new Card("4", "C"), new Card("4", "H")], player2)
      game._turnResults = [result]
      expect(game.turnResults()).toEqual([result])
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
    
  })
});