describe('Card', () => {
  describe('#constructor', () => {
    
    it("sets the card's rank", () => {
      var card = new Card("4", "S")
      expect(card._rank).toEqual("4")
    })
  })
})