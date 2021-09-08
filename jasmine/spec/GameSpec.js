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

  describe('#dealCards', () => {
    it('gives everyone 7 cards if there are 3 or fewer players', () => {
      const player1 = new Player('Player 1')
      const player2 = new Player('Player 2')
      const player_list = [player1, player2]
      const game = new Game(player_list)
      game.dealCards()
      for(let player of player_list) {expect(player.cards().length).toBe(Game.starting_card_count_for_few_players)}
    })

    it('gives everyone 5 cards if there are 4 or more players', () => {
      const player_list = []
      for(let i = 0; i<4; i++) {player_list.push(new Player('Player'))}
      const game = new Game(player_list)
      game.dealCards()
      for(let player of player_list) {expect(player.cards().length).toBe(Game.starting_card_count_for_many_players)}
    })

    it('removes the dealt cards from the deck', () => {
      const player_list = []
      for(let i = 0; i<4; i++) {player_list.push(new Player('Player'))}
      const game = new Game(player_list)
      game.dealCards()
      expect(game._deck._cards.length).toEqual(Deck.default_deck_size - (Game.starting_card_count_for_many_players * 4))
    })
  })

  describe('#deck', () => {
    it('returns the deck of the game', () => {
      const player1 = new Player('Player 1')
      const player2 = new Player('Player 2')
      const player_list = [player1, player2]
      const game = new Game(player_list)
      expect(game.deck()).toEqual(game._deck)
    })
  })

  describe('#minimum_player_count', () => {
    it("returns the game's minimum number of players", () => {
      const game = new Game([], 3)
      expect(game.minimum_player_count()).toEqual(3)
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

  describe('#startGame', () => {
    it('shuffles the deck', () => {

    })

    it('deals the cards', () => {
      const player1 = new Player('Player 1')
      const player2 = new Player('Player 2')
      const player_list = [player1, player2]
      const game = new Game(player_list)
      game.start()
      expect(game.players()[0].cards().length).toBeGreaterThan(0)
      expect(game.deck().cardsInDeck()).toBeLessThan(Deck.default_deck_size)
    })

    it("doesn't start if it has already started once", () => {
      
    })
  })
});