import React, { Component } from "react"

import "./ChatComponent.css"
// import { Tooltip } from "@material-ui/core"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export default class ChatComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: [],
      message: "",
    }
    this.chatScroll = React.createRef()

    this.handleChange = this.handleChange.bind(this)
    this.handlePressKey = this.handlePressKey.bind(this)
    this.close = this.close.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data)
        // console.log("message 수신 : ", data)
        let messageList = this.state.messageList
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
          icon: data.icon ? data.icon : "basic",
        })
        setTimeout(() => {
          this.props.messageReceived()
        }, 50)
        this.setState({ messageList: messageList })
        this.scrollToBottom()
      })
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      this.sendMessage()
    }
  }

  sendMessage() {
    // console.log(this.state.message, this.props.user.getUserIcon())
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "")
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
          icon: this.props.user.getUserIcon(),
        }

        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        })
      }
    }
    this.setState({ message: "" })
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight
      } catch (err) {}
    }, 20)
  }

  close() {
    this.props.close(undefined)
  }

  render() {
    const styleChat = { display: this.props.chatDisplay }
    return (
      <div className="z-0 w-full h-full chatContainer ">
        <div className="chat-head w-full h-[40px] bg-gradient-to-l from-lgBlue-500 to-secondary-500  border-white shadow-md rounded-t-xl flex items-center justify-center text-gray-700 ">
          <span>채팅</span>
        </div>
        <div id="chatComponent" style={styleChat}>
          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers"
                className={
                  "message" +
                  (data.connectionId !== this.props.user.getConnectionId()
                    ? " left"
                    : " right")
                }
              >
                <img
                  id={"userImg-" + i}
                  src={`/images/badgeIcon/${data.icon}.png`}
                  className="user-img shadow-sm"
                />
                <div className="msg-detail">
                  <div className="msg-content">
                    <div className="msg-info">
                      <p> {data.nickname}</p>
                    </div>
                    <p className="chat-text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="messageInput">
            <input
              placeholder="Send a Message"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <div title="Send message">
              <div
                size="small"
                id="sendButton"
                onClick={this.sendMessage}
                className="p-4 bg-secondary-500 border rounded-full"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className=" text-primary-700 w-[50%] h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
