import React, { Component } from "react"
import "./ToolbarComponent.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faCameraRotate,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { fullscreen: false }
    this.camStatusChanged = this.camStatusChanged.bind(this)
    this.micStatusChanged = this.micStatusChanged.bind(this)
    this.screenShare = this.screenShare.bind(this)
    this.stopScreenShare = this.stopScreenShare.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.switchCamera = this.switchCamera.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.toggleChat = this.toggleChat.bind(this)
  }

  micStatusChanged() {
    this.props.micStatusChanged()
  }

  camStatusChanged() {
    this.props.camStatusChanged()
  }

  screenShare() {
    this.props.screenShare()
  }

  stopScreenShare() {
    this.props.stopScreenShare()
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen })
    this.props.toggleFullscreen()
  }

  switchCamera() {
    this.props.switchCamera()
  }

  leaveSession() {
    this.props.leaveSession()
  }

  toggleChat() {
    this.props.toggleChat()
  }

  render() {
    const mySessionId = this.props.sessionId
    const localUser = this.props.user
    return (
      <div className=" flex">
        <div>
          {this.props.sessionId && (
            <div>
              <span id="session-title">{mySessionId}</span>
            </div>
          )}
        </div>

        <div className=" flex">
          <div
            color="inherit"
            className="navButton"
            id="navMicButton"
            onClick={this.micStatusChanged}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <FontAwesomeIcon icon={faMicrophone} />
            ) : (
              <FontAwesomeIcon icon={faMicrophoneSlash} />
            )}
          </div>

          <div
            color="inherit"
            className="navButton"
            id="navCamButton"
            onClick={this.camStatusChanged}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <FontAwesomeIcon icon={faVideo} />
            ) : (
              <FontAwesomeIcon icon={faVideoSlash} />
            )}
          </div>

          <div
            color="inherit"
            className="navButton"
            onClick={this.switchCamera}
          >
            <FontAwesomeIcon icon={faCameraRotate} />
          </div>
          {/* <div color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </div> */}
          <div
            color="secondary"
            className="navButton"
            onClick={this.leaveSession}
            id="navLeaveButton"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
          {/* <div
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </div> */}
        </div>
      </div>
    )
  }
}
