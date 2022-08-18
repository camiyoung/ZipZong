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
import IconWrapper from "../IconWrapper"

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
    this.props.goBack()
  }

  toggleChat() {
    this.props.toggleChat()
  }

  render() {
    const mySessionId = this.props.sessionId
    const localUser = this.props.user
    return (
      <div className=" flex w-full z-50">
        {/* <div>
          {this.props.sessionId && (
            <div>
              <span id="session-title">{mySessionId}</span>
            </div>
          )}
        </div> */}

        <div className="flex w-full justify-center ">
          <IconWrapper
            handler={this.micStatusChanged}
            // isActive={localUser.isAudioActive()}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <FontAwesomeIcon icon={faMicrophone} className=" text-white" />
            ) : (
              <FontAwesomeIcon
                icon={faMicrophoneSlash}
                className=" text-white"
              />
            )}
          </IconWrapper>

          <IconWrapper
            handler={this.camStatusChanged}
            // isActive={localUser.isVideoActive()}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <FontAwesomeIcon icon={faVideo} className=" text-white" />
            ) : (
              <FontAwesomeIcon icon={faVideoSlash} className=" text-white" />
            )}
          </IconWrapper>

          <IconWrapper handler={this.switchCamera}>
            <FontAwesomeIcon icon={faCameraRotate} className=" text-white" />
          </IconWrapper>
          {/* <div color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </div> */}
          <IconWrapper handler={this.leaveSession} isActive={false}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className=" text-white"
            />
          </IconWrapper>
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
