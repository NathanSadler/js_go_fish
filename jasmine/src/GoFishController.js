class GoFishController {
  container() {
    return document.getElementById('main')
  }

  foo() {
    console.log("i am trying to work")
  }

  login() {
    const view = new LoginView(this.startGame.bind(this))
    view.draw(this.container())
  }

  startGame(name) {
    const player = new Player(name)
    const game = new Game([player])
    game.start()
    const view = new GameView(game)
    view.draw(this.container())
  }

  playTurn(game, requesting_player_index, requested_player_index, requested_rank) {
    console.log('GoFishController#playTurn got called!')
    game.playTurn(requesting_player_index, requested_player_index, requested_rank)
    this.loadGame(game)
    
  }

  loadGame(game) {
    const view = new GameView(game)
    view.draw(this.container())
    console.log('GoFishController#loadGame got called!')
  }

  // container is one element HTML that gets updated with JS
}

window.controller = new GoFishController();
window.onload = controller.login.bind(window.controller)