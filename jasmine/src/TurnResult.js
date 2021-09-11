class TurnResult {
  constructor(game, requestingPlayerIndex, requestedPlayerIndex, requestedRank, receivedCards) {
    this._game = game
    this._requestingPlayerIndex = requestingPlayerIndex
    this._requestedPlayerIndex = requestedPlayerIndex
    this._requestedRank = requestedRank
    this._receivedCards = receivedCards
  }

  game() {
    return this._game
  }

  receivedCards() {
    return this._receivedCards
  }

  requestedPlayer() {
    return this.game().players()[this.requestedPlayerIndex()]
  }

  requestedPlayerIndex() {
    return this._requestedPlayerIndex
  }

  requestingPlayer() {
    return this.game().players()[this.requestingPlayerIndex()]
  }

  requestingPlayerIndex() {
    return this._requestingPlayerIndex
  }

  requestedRank() {
    return this._requestedRank
  }
}