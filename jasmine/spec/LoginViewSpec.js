describe('LoginView', () => {
  describe('form submit', () => {
    it("calls a passed-in function using the logged in player's name", () => {
      const expected_value = 'Foobar'
      let calledWith
      const onLogin = (name) => {calledWith = name}
      const view = new LoginView(onLogin)
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      view.nameInput().value = expected_value
      view.submitButton().click()
      expect(calledWith).toEqual(expected_value)
      container.remove()
    })

    it("doesn't do anything if it isn't given a name", () => {
      let submitted = false
      const onLogin = () => {submitted = true}
      const view = new LoginView(onLogin)
      const container = document.createElement('div')
      document.body.appendChild(container)
      view.draw(container)
      view.nameInput().value = ''
      view.submitButton().click()
      expect(submitted).toBeFalse()
      container.remove()
    })
  })
})