class BotPlayer extends Player {
  constructor(name) {
    super(name)
  }

  selectRankToAskFor() {
    const index = Math.floor(Math.random() * (this.cards().length))
    return this.cards()[index].rank()
  }
}