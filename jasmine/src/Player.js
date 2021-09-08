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

  takeCard(taken_card) {
    this._cards.push(taken_card)
  }
}