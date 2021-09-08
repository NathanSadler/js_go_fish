class Game {
  constructor(players, minimum_player_count = 2) {
    this._players = players
    this._minimum_player_count = minimum_player_count
    this._deck = Deck.new()
  }

  players() {
    return this._players
  }

  minimum_player_count() {
    return this._minimum_player_count
  }
}