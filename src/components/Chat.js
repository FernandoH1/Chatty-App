import React, { Component } from "react";
import { auth, db } from "../services/firebase";
import { ref, push, onValue } from "@firebase/database";
import {signOut} from "firebase/auth"

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth?.currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ readError: null });
    try {
      onValue(ref(db, "chats"), (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      console.log("err");
      this.setState({ readError: error.message });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await push(ref(db, "chats"), {
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  render() {
    return (
      <div>
        <div className="chats">
          {this.state.chats.map((chat) => {
            return <p key={chat.timestamp}>{chat.content}</p>;
          })}
        </div>
        <form id="send-message" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.content}
          ></input>
          {this.state.error ? <p>{this.state.writeError}</p> : null}
          <button type="submit" class="btn btn-success">Enviar Mensaje</button>
        </form>
        <div>
          Logeado como: <strong>{this.state.user?.email}</strong>
        </div>
        <button class="btn btn-danger" onClick={() => signOut(auth)}> Cerrar sesi??n</button>
      </div>
    );
  }
}
