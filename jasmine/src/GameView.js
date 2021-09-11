class GameView {

  constructor(game) {
    this._game = game
  }

  game() {
    return this._game
  }

  cardButton(cardId) {
    return document.getElementById(cardId)
  }

  // This doesn't exist in the tests. I guess that makes sense
  // controller() {
  //   return window.controller
  // }

  draw(container) {
    container.innerHTML = ""
    const markup = 
    `
      <h1>Game</h1>
      <h2>Players</h2>
      <ul>
        ${this.game().players().map(player => `<li>${player.name()}- ${player.cards().length} card(s)</li>`).join('')}
      </ul>
      <h2>Your Cards</h2>
      <ul>
        ${this.game().players()[0].cards().map(card => `<li>${card.describe()}</li>`).join('')}
      </ul>
      
      <form class='turn-form'>
        ${this.game().players().map((player, index) => `<input type='radio' name='player_name' id='${index}' value='${index}'> <label for='${index}'>${player.name()}</label><br>`).join('')}
        ${this.game().players()[0].cards().map(card => `<input type='radio' name='card' id='${card.generateId()}' value=${card.generateId()}> <label for='${card.generateId()}'>${card.describe()}</label><br>`).join('')}
        <input type="submit" id="submit"></input>
      </form>    
    `
    const element = document.createElement('div')
    element.innerHTML = markup
    element.onsubmit = this.onSubmit.bind(this)
    container.appendChild(element)
    return element
  }

  onSubmit(event) {
    event.preventDefault()
    // Get values needed for the playTurn method
    let regex = new RegExp('_')
    const requested_rank_index = event.target.card.value.search(regex)
    const requested_rank = event.target.card.value.slice(0, requested_rank_index)
    const requested_player_index = Number(event.target.player_name.value)

    if (requested_player_index != 0 && requested_player_index != 1) {
      debugger
    }

    // Play the turn
   this._game.playTurn(this._game.turnPlayerIndex(), requested_player_index, requested_rank)
   
   // make new view with updated game
   const view = new GameView(this._game)

   // display new updated view
   view.draw(document.getElementById('main'))
  }

  playerButton(playerIndex) {
    return document.getElementById(playerIndex.toString())
  }

  submitButton() {
    return document.querySelector('input[type="submit"]')
  }
  
}