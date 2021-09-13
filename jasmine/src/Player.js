class Player {
  constructor(name) {
    this._name = name;
    this._cards = [];
    this._score = 0
  }

  cards() {
    return this._cards
  }

  cardCount() {
    return this.cards().length
  }

  countCardsWithRank(rank) {
    return this.getCardsWithRank(rank).length
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

  getCardsWithRank(rank) {
    return this.cards().filter(card => card.rank() == rank)
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
    if(taken_card !== null) {
      this._cards.push(taken_card)

      const taken_card_rank = taken_card.rank()
  
      if(this.countCardsWithRank(taken_card_rank) == 4) {
        this._score += 1
        this.removeCardsWithRank(taken_card_rank)
      }
      
      return taken_card
    }

    return []

  }
}