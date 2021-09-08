class Deck {
  static default_deck_size = 52

  constructor(card_list = Deck.defaultCards()) {
    this._cards = card_list
  }

  cardsInDeck() {
    return this._cards.length
  }

  removeCard() {
    return this._cards.shift()
  }

  static defaultCards() {
    const card_list = []
    const suits = ['C', 'D', 'H', 'S']
    const card_values = ['A', 'J', 'Q', 'K']
    for(let value = 2; value < 11; value++) {
      card_values.push(value.toString())
    }

    for (let value of card_values) {
      for(let suit of suits) {
        card_list.push(new Card(value, suit))
      }
    }

    return card_list
  }
}