class LoginView {
  constructor(onLogin) {
    this.onLogin = onLogin
  }

  // This is just temporary. Will replace it when I figure out what I am doing  
  draw(container) {
    const markup = `
      <p>Hello World</p>
    `
    const element = document.createElement('div')
    element.innerHTML = markup
    container.appendChild(element)
    return element
  }
}