class LoginView {
  constructor(onLogin) {
    this.onLogin = onLogin
  }

  nameInput() {
    return document.getElementById('name')
  }

  onSubmit(event) {
    event.preventDefault();
    this.onLogin(event.target.name.value)
  }

  submitButton() {
    return document.getElementById('submit')
  }

  draw(container) {
    const markup = `
      <form class="user-form">
        <label for="name">Your Name</label>
        <input type="text" id="name"></input>
        <input type="submit" id="submit" value="login"></input>  
      </form>
    `
    const element = document.createElement('div')
    element.innerHTML = markup
    element.onsubmit = this.onSubmit.bind(this)
    container.appendChild(element)
    return element
  }
}