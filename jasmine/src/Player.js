class Player {
  constructor(name) {
    this._name = name;
    this._cards = [];
    this._score = 0
  }

  cards() {
    return this._cards
  }

  equals(otherPlayer) {
    const sameNames = this.name() == otherPlayer.name()
    let sameCards = true

    if(this.cards().length == otherPlayer.cards().length) {
      this.cards().forEach((_, index) => {
        if (!this.cards()[index].equals(otherPlayer.cards()[index])) {sameCards = false}
      })
    } else {sameCards = false}

    return (sameNames && sameCards)
  }

  name() {
    return this._name;
  }

  removeCardsWithRank(rank) {
    const kept_cards = this._cards.filter(card => card.rank() != rank)
    const lost_cards = this._cards.filter(card => card.rank() == rank)
    this._cards = kept_cards
    return lost_cards
  }

  score() {
    return this._score
  }

  setHand(new_hand) {
    this._cards = new_hand
  }

  takeCard(taken_card) {
    this._cards.push(taken_card)
    return taken_card
  }
}