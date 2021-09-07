class GameView {

  constructor(game) {
    this._game = game
  }

  game() {
    return this._game
  }

  // This is just temporary. Will replace it when I figure out what I am doing  
  draw(container) {
    const markup = 
    `
      <h1>Game</h1>
      <h2>Players</h2>
      <ul>
        ${this.game().players().map(player => `<li>${player.name()}</li>`)}
      </ul>
    `
    const element = document.createElement('div')
    element.innerHTML = markup
    container.appendChild(element)
    return element
  }
}