class GameView {

  constructor(game) {
    this._game = game
  }

  game() {
    return this._game
  }

  draw(container) {
    container.innerHTML = ""
    const markup = 
    `
      <h1>Game</h1>
      <h2>Players</h2>
      <ul>
        ${this.game().players().map(player => `<li>${player.name()}</li>`).join('')}
      </ul>
      <h2>Your Cards</h2>
      <ul>
        ${this.game().players()[0].cards().map(card => `<li>${card.describe()}</li>`).join('')}
      </ul>
    `
    const element = document.createElement('div')
    element.innerHTML = markup
    container.appendChild(element)
    return element
  }
}