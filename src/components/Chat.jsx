import React, { Component } from "react";
import { loginService } from "../services/login.service";
import HistoryItem from "./HistoryItem";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyList: []
    };
    this.hadleOnKeyDown = this.hadleOnKeyDown.bind(this);
  }

  componentDidMount() {
    console.log("cdm");
  }
  componentWillReceiveProps() {}
  hadleOnKeyDown(e) {
    if (e.key === "Enter") {
      this.props.onItemAdd(this.inputMessage.value);
      this.inputMessage.value = "";
    }
  }

  render() {
    const historyList = this.props.historyList.map((item, index) => {
      return <HistoryItem key={index} text={item.message}></HistoryItem>;
    });
    console.log("historyitems", this.props);
    return (
      <div className="card text-center chat-window">
        <div className="card-header">Chat With {this.props.username}</div>
        <div className="card-body">{historyList}</div>
        <div className="card-footer text-muted">
          <input
            placeholder="Type your message"
            onKeyDown={this.hadleOnKeyDown}
            ref={el => (this.inputMessage = el)}
          ></input>
        </div>
      </div>
    );
  }
}
