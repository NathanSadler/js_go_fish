class Game {
  static many_players_threshold = 4
  static starting_card_count_for_few_players = 7
  static starting_card_count_for_many_players = 5

  constructor(players, minimum_player_count = 2) {
    this._players = players
    this._minimum_player_count = minimum_player_count
    this._deck = new Deck()
    this._turnPlayerIndex = 0
  }

  addPlayer(player_to_add) {
    this.players().push(player_to_add)
  }

  dealCards() {
    const starting_card_count = (this.players().length < Game.many_players_threshold) ? 
      Game.starting_card_count_for_few_players : Game.starting_card_count_for_many_players

    const dummy = [...Array(starting_card_count)].forEach((_, i) => {
      this._players.forEach((player) => {player.takeCard(this._deck.removeCard())})
    })
  }

  deck() {
    return this._deck
  }

  incrementTurnPlayerIndex() {
    this._turnPlayerIndex++
    if(this.turnPlayerIndex() >= this.playerCount()) {
      this._turnPlayerIndex = 0
    }
    return this.turnPlayerIndex()
  }

  minimum_player_count() {
    return this._minimum_player_count
  }

  players() {
    return this._players
  }

  playerCount() {
    return this.players().length
  }

  playTurn(requesting_player, requested_player, requested_rank) {
    const taken_cards = requested_player.removeCardsWithRank(requested_rank)
    taken_cards.forEach(card => requesting_player.takeCard(card))
    
    if (taken_cards.length == 0){
      const card_from_deck = requesting_player.takeCard(this._deck.removeCard())

      if(card_from_deck.rank() != requested_rank) {
        this._turnPlayerIndex++
      }
      
    }
  }

  start() {
    while (this.playerCount() < this.minimum_player_count()) {
      this.addPlayer(new BotPlayer(`Player ${this.playerCount() + 1} (Bot)`))
    }
    this.deck().shuffle()
    this.dealCards()
  }

  turnPlayerIndex() {
    return this._turnPlayerIndex
  }
}