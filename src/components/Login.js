import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGitHub, signInWithGoogle } from "../helpers/auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async githubSignIn() {
    try {
      await signInWithGitHub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div>
        <form
          autoComplete="off"
          onSubmit={this.handleSubmit}
          id="form-login"
        >
          <h1>
            Login to 
            <Link to="/">
              Chatty
            </Link>
          </h1>
          <p>
            Complete el siguiente formulario para iniciar sesión en su cuenta.
          </p>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            {this.state.error ? (
              <p>{this.state.error}</p>
            ) : null}
            <button class="btn btn-success" type="submit">Login</button>
          </div>
          <hr />
          <p>
            No Tienes Una Cuenta? <Link to="/signup">Registrate</Link>
          </p>
          <p>También puedes Iniciar con:</p>
            <button id="sign-in-with-google" class="btn btn-success m-2" onClick={this.googleSignIn} type="button">
               Regístrate con Google
            </button>
            <button id="sign-in-with-github" class="btn btn-success" type="button" onClick={this.githubSignIn}>
              Regístrate con GitHub
            </button>
        </form>
      </div>
    );
  }
}