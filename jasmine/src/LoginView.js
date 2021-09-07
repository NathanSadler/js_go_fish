class LoginView {
  constructor(onLogin) {
    this.onLogin = onLogin
  }

  nameInput() {
    return document.getElementById('name')
  }

  submitButton() {
    return document.getElementById('submit')
  }

  // This is just temporary. Will replace it when I figure out what I am doing  
  draw(container) {
    const markup = `
      <p>Login View</p>
    `
    const element = document.createElement('div')
    element.innerHTML = markup
    container.appendChild(element)
    return element
  }
}