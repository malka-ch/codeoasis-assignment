import React, { Component } from "react";
import { loginService } from "../services/login.service";
import Chat from "./Chat";
import UserItem from "./UserItem";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: loginService.fakeUserList,
      chatUser: null,
      historyList: []
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleChatItemAdd = this.handleChatItemAdd.bind(this);
  }
  componentDidMount() {
    this.updateUserInterval = setInterval(() => {
      //fake
      this.setState({ userList: loginService.fakeUserList });
      //test live update
      loginService.fakeUserList.push({
        username: Math.floor(Math.random() * 145546656),
        password: "ddd",
        token: "dsfsd"
      });
      //real code
      // const requestOptions = {
      //     method: 'GET',
      //     headers: { 'Authorization': `Bearer ${loginService.currentUserValue.token}` }
      //
      // };

      // return fetch(`api.url.com/users/authenticate`, requestOptions)
      //     .then(res => res.json())
      //     .then(user => {
      //         // store user details and jwt token in local storage to keep user logged in between page refreshes
      //         this.setState({userList = loginService.fakeUserList});
      //     });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.updateUserInterval);
  }

  handleChatItemAdd(message) {
    this.historyList.push({ message: message });
    localStorage.setItem(this.chatKey, JSON.stringify(this.historyList));
    this.setState({ historyList: this.historyList });
  }
  handleItemClick(username) {
    console.log("user clicked", username);
    this.chatKey =
      loginService.currentUserValue.username + "with" + username + "history";
    let list = JSON.parse(localStorage.getItem(this.chatKey));
    console.log("list", list);
    if (list) {
      this.historyList = list;
    } else {
      this.historyList = [];
    }
    this.setState({ historyList: this.historyList });
    this.inputMessage = "";
    this.setState({ chatUser: username });
  }

  render() {
    const listItems = this.state.userList.map(user => {
      if (loginService.currentUserValue.username != user.username)
        return (
          <UserItem
            key={user.username}
            onClickHandler={this.handleItemClick}
            user={user}
          ></UserItem>
        );
      return null;
    });

    return (
      <div>
        <h1> Home page</h1>
        <ul className="list-group">{listItems}</ul>
        {this.state.chatUser && (
          <Chat
            historyList={this.state.historyList}
            onItemAdd={this.handleChatItemAdd}
            username={this.state.chatUser}
          ></Chat>
        )}
      </div>
    );
  }
}
