describe('Player', () => {
  const player = new Player('Player')

  describe('#constructor', () => {
    it("sets the player's name", () => {
      // const player = new Player('Player')
      expect(player._name).toEqual('Player')
    })
  })

  describe('#name', () => {
    it("returns the player's name", () => {
      
      expect(player.name()).toEqual('Player')
    })
  })

  describe('#cards', () => {
    it('returns a list of the cards the player has', () => {
      const player = new Player('Player')
      card_list = [new Card("4", "D"), new Card("5", "D"), new Card("6", "D")]
      player._cards = card_list
      expect(player.cards()).toEqual(card_list)
    })
  })
})