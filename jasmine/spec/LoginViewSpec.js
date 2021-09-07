describe('LoginView', () => {
  describe('form submit', () => {
    it("calls a passed-in function using the logged in player's name", () => {
      expected_value = 'Foobar'
      let calledWith
      const onLogin = (name) => {calledWith = name}
      const view = new LoginView(onLogin)
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      view.nameInput().value = expected_value
      view.submitButton().click()
      expect(calledWith).toEqual(expected_value)
    })
  })
})