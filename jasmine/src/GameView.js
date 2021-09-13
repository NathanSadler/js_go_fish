class GameView {

  constructor(game) {
    this._game = game
  }

  game() {
    return this._game
  }

  cardSelectionBox() {
    return document.getElementById('card')
  }

  // This doesn't exist in the tests. I guess that makes sense
  // controller() {
  //   return window.controller
  // }

  draw(container) {
    container.innerHTML = ""
    const markup = this.game().isOver() ? this.gameOverScreenMarkup() : this.mainScreenMarkup()
    const element = document.createElement('div')
    element.innerHTML = markup
    element.onsubmit = this.onSubmit.bind(this)
    container.appendChild(element)
    return element
  }

  gameOverScreenMarkup() {
    const markup = `
    <h1>Game Over</h1>
    <ul>
      ${this.game().players().map(player => `<li>${player.name()}- ${player.score()} book(s)</li>`).join('')}
    </ul>
    `
    return markup
  }

  mainScreenMarkup() {
    const markup = `
    <h1>Game</h1>
    <p>You are ${this.game().players()[0]}</p>
    <p>It is ${this.game().turnPlayer().name()}'s turn</p>
    <p>The deck has ${this.game().deck().cardsLeft()} card(s).</p>
    <div style='display:flex; flex-direction:row'>
      <div>
        <h2>Players</h2>
        <ul>
          ${this.game().players().map(player => `<li>${player.name()}- ${player.cards().length} card(s)</li>`).join('')}
        </ul>
      </div>

      <div id='turn_results'>
        <h2>Turn Results</h2>
        <ul>
          ${this.game().turnResults().map(result => `<li>${result.message()}</li>`).join('')}
        </ul>
      </div>
      
    </div>
    
    <form class='turn-form'>
      <select name="player_name" id="player_name">
        ${this.game().players().slice(1).map((player) => `<option value="${this.game().getIndexOfPlayer(player)}">${player.name()}</option>`).join('')}
      </select>

      <select name='card' id='card'>
        ${this.game().players()[0].cards().map(card => `<option value='${card.generateId()}'>${card.describe()}</option>`).join('')}
      </select>
      <input type="submit" id="submit"></input>
    </form>    
  `

  return markup
  }

  onSubmit(event) {
    event.preventDefault()
    // Get values needed for the playTurn method
    let regex = new RegExp('_')
    const requested_rank_index = event.target.card.value.search(regex)
    const requested_rank = event.target.card.value.slice(0, requested_rank_index)
    const requested_player_index = Number(event.target.player_name.value)

    // Play the turn
   this._game.playTurn(this._game.turnPlayerIndex(), requested_player_index, requested_rank)
   
   // make new view with updated game
  //  const view = new GameView(this._game)

   // display new updated view
   this.draw(document.getElementById('main'))
  }

  playerSelectionBox() {
    return document.getElementById('player_name')
  }

  submitButton() {
    return document.querySelector('input[type="submit"]')
  }
  
}