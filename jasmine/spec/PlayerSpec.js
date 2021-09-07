describe('Player', () => {
  describe('#constructor', () => {
    it("sets the player's name", () => {
      const player = new Player('Player')
      expect(player._name).toEqual('Player')
    })
  })

  describe('#name', () => {
    it("returns the player's name", () => {
      const player = new Player('Player')
      expect(player.name()).toEqual('Player')
    })
  })
})