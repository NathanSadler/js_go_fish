class Player {
  constructor(name) {
    this._name = name;
    this._cards = [];
  }

  cards() {
    return this._cards
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

  takeCard(taken_card) {
    this._cards.push(taken_card)
  }
}