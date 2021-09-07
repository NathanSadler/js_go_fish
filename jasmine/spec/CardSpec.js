describe('Card', () => {
  describe('#constructor', () => {
    
    it("sets the card's rank", () => {
      var card = new Card("4", "S")
      expect(card._rank).toEqual("4")
    })

    it("sets the card's suit", () => {
      var card = new Card("4", "D")
      expect(card._suit).toEqual("D")
    })
  })
})