class Card {
  constructor(rank, suit) {
    this._rank = rank;
    this._suit = suit;
  }

  describeRank() {
    const named_ranks = {
      'A' : 'Ace',
      'J' : 'Jack',
      'Q' : 'Queen',
      'K' : 'King'
    }
    if(named_ranks.hasOwnProperty(this._rank)) {
      return named_ranks[this._rank]
    }

    return this._rank
  }

  describeSuit() {
    const suits = {
      'C' : 'Clubs',
      'D' : 'Diamonds',
      'H' : 'Hearts',
      'S' : 'Spades'
    }
    
    return suits[this._suit]
  }

  describe() {
    return `${this.describeRank()} of ${this.describeSuit()}`
  }
}