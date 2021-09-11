class TurnResult {
  constructor(game, requestingPlayerIndex, requestedPlayerIndex, requestedRank, receivedCards, cardSource) {
    this._game = game
    this._requestingPlayerIndex = requestingPlayerIndex
    this._requestedPlayerIndex = requestedPlayerIndex
    this._requestedRank = requestedRank
    this._receivedCards = receivedCards
    this._cardSource = cardSource
  }

  cardSource() {
    return this._cardSource
  }

  cardSourceName() {
    if (this.cardSource() instanceof Player) {
      return this.cardSource().name()
    } else {
      return this.cardSource()
    }
  }

  game() {
    return this._game
  }

  message() {
    const whoAskedWhoForWhat = `${this.requestingPlayer().name()} asked ${this.requestedPlayer().name()} for ${this.requestedRank()}s`
    let message
    if(this.cardSource() instanceof Player) {
      message = `and got ${this.receivedCards().length} of them.`
    } else if(this.receivedCards().length == 0) {
      message = "but didn't get any cards."
    } else if(this.receivedCards()[0].rank() == this.requestedRank()) {
      message = 'and drew one from the deck.'
    }
    else {
      message = 'and drew a card from the deck.'
    }

    return `${whoAskedWhoForWhat} ${message}`
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