class Game {
  static many_players_threshold = 4
  static starting_card_count_for_few_players = 7
  static starting_card_count_for_many_players = 5

  constructor(players, minimum_player_count = 2) {
    this._players = players
    this._minimum_player_count = minimum_player_count
    this._deck = new Deck()
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

  minimum_player_count() {
    return this._minimum_player_count
  }

  players() {
    return this._players
  }

  playerCount() {
    return this.players().length
  }

  start() {
    while (this.playerCount() < this.minimum_player_count()) {
      this.addPlayer(new BotPlayer(`Player ${this.playerCount() + 1} (Bot)`))
    }
    this.deck().shuffle()
    this.dealCards()
  }
}