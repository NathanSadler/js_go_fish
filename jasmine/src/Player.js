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
}