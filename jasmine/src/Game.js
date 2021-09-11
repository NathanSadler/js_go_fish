class Game {
  static many_players_threshold = 4
  static starting_card_count_for_few_players = 7
  static starting_card_count_for_many_players = 5

  constructor(players, minimum_player_count = 2) {
    this._players = players
    this._minimum_player_count = minimum_player_count
    this._deck = new Deck()
    this._turnPlayerIndex = 0
    this._turnResults = []
  }

  addPlayer(player_to_add) {
    this.players().push(player_to_add)
  }

  dealCards() {
    const starting_card_count = (this.players().length < Game.many_players_threshold) ? 
      Game.starting_card_count_for_few_players : Game.starting_card_count_for_many_players

    const dummy = [...Array(starting_card_count)].forEach((_, i) => {
      this._players.forEach((player) => {player.takeCard(this._deck.removeCard())})
    })
  }

  deck() {
    return this._deck
  }

  getIndexOfPlayer(targetPlayer) {
    let playerIndex = -1
    this.players().forEach((player, thisIndex) => {
      if(player.equals(targetPlayer)){
        playerIndex = thisIndex
      }})

    return playerIndex
  }

  incrementTurnPlayerIndex() {
    this._turnPlayerIndex++
    
    // reset turn player index if it goes too high
    if(this.turnPlayerIndex() >= this.playerCount()) {
      this._turnPlayerIndex = 0
    }

    if(this.turnPlayer() instanceof BotPlayer) {
      let bot = this.turnPlayer()
      this.playTurn(this.turnPlayerIndex(), bot.selectPlayerToAskIndex(this), bot.selectRankToAskFor(this))
    }

    return this.turnPlayerIndex()
  }

  minimum_player_count() {
    return this._minimum_player_count
  }

  players() {
    return this._players
  }

  playerCount() {
    return this.players().length
  }

  playTurn(requesting_player_index, requested_player_index, requested_rank) {
    // use the given indexes to get the players
    const requesting_player = this.players()[requesting_player_index]
    const requested_player = this.players()[requested_player_index]

    let receivedCards
    let cardSource = requested_player

    // give cards taken from asked player to asking player
    receivedCards = requested_player.removeCardsWithRank(requested_rank)
    receivedCards.forEach(card => requesting_player.takeCard(card))
    
    if (receivedCards.length == 0){
      // draw a card from the deck if no cards were taken from another player
      receivedCards = [requesting_player.takeCard(this._deck.removeCard())]
      cardSource = "the deck"

      // increment the turn player index if the drawn card wasn't of the requested rank
      if(receivedCards[0].rank() != requested_rank) {
        this.incrementTurnPlayerIndex()
      }    
    }

    // save the turn result
    this._turnResults.push(new TurnResult(this, requesting_player_index, requested_player_index, requested_rank, receivedCards, cardSource))

  }

  start() {
    while (this.playerCount() < this.minimum_player_count()) {
      this.addPlayer(new BotPlayer(`Player ${this.playerCount() + 1} (Bot)`))
    }
    this.deck().shuffle()
    this.dealCards()
  }

  turnPlayer() {
    return this.players()[this._turnPlayerIndex]
  }

  turnPlayerIndex() {
    return this._turnPlayerIndex
  }

  turnResults() {
    return this._turnResults
  }
}