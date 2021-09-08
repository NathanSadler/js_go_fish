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

  // shoutouts to https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
  shuffle() {
    for(let i=this.cardsInDeck() - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      let temp = this._cards[j]
      this._cards[j] = this._cards[i]
      this._cards[i] = temp
    }
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