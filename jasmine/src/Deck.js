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
    const indexes = [...Array(this.cardsInDeck() - 1)].map((_, index) => {return index + 1})
    indexes.reverse().forEach((i) => {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = this._cards[j];
      this._cards[j] = this._cards[i];
      this._cards[i] = temp;
    })
  }

  static defaultCards() {
    const card_list = []
    const suits = ['C', 'D', 'H', 'S']
    const card_values = new Array('A', 'J', 'Q', 'K')
    
    // why does this need to be assigned to a variable to be happy?
    const dummy = [...Array(9)].forEach((_, i) => {card_values.push((i + 2).toString())})

    card_values.forEach((value) => {
      suits.forEach((suit) => {
        card_list.push(new Card(value, suit))
      })
    })

    return card_list
  }
}