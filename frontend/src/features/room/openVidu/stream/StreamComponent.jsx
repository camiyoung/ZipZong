import React, { Component } from "react"
import "./StreamComponent.css"
import OvVideoComponent from "./OvVideo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMicrophoneSlash,
  faVideoSlash,
  faVolumeXmark,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons"

// import MicOff from "@material-ui/icons/MicOff"
// import VideocamOff from "@material-ui/icons/VideocamOff"
// import VolumeUp from "@material-ui/icons/VolumeUp"
// import VolumeOff from "@material-ui/icons/VolumeOff"
// import FormControl from "@material-ui/core/FormControl"
// import Input from "@material-ui/core/Input"
// import InputLabel from "@material-ui/core/InputLabel"
// import IconButton from "@material-ui/core/IconButton"
// import HighlightOff from "@material-ui/icons/HighlightOff"
// import FormHelperText from "@material-ui/core/FormHelperText"

export default class StreamComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
      isFormValid: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePressKey = this.handlePressKey.bind(this)
    this.toggleNicknameForm = this.toggleNicknameForm.bind(this)
    this.toggleSound = this.toggleSound.bind(this)
  }

  handleChange(event) {
    this.setState({ nickname: event.target.value })
    event.preventDefault()
  }

  toggleNicknameForm() {
    if (this.props.user.isLocal()) {
      this.setState({ showForm: !this.state.showForm })
    }
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound })
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      console.log(this.state.nickname)
      if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
        this.props.handleNickname(this.state.nickname)
        this.toggleNicknameForm()
        this.setState({ isFormValid: true })
      } else {
        this.setState({ isFormValid: false })
      }
    }
  }

  render() {
    return (
      <div className="relative w-full h-full">
        <div className="absolute top-5 z-30">
          <span
            id="nickname"
            className=" bg-[#c9d8da7c] px-3 py-1 pr-5 rounded-r-lg  border-orange-700"
          >
            {this.props.user.getNickname()}
            {JSON.parse(
              this.props.user.getStreamManager().stream.connection.data
            ).admin && <span className="text-xl p-1"> 👑 </span>}
          </span>
          {this.props.user.isLocal() && <span id=""> </span>}
        </div>

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent relative w-full h-full ">
            {!this.props.user.isVideoActive() && (
              <div className="w-full h-full absolute z-10 bg-lightBlue rounded-2xl">
                <img
                  src="/images/videoOff.jpg"
                  className="w-full h-full rounded-2xl"
                  alt="비디오 꺼짐 화면"
                />
              </div>
            )}
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
              myVideoRef={this.props.myVideoRef}
            />
            <div className="absolute left-2 mb-3" id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <FontAwesomeIcon icon={faVideoSlash} />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <FontAwesomeIcon icon={faMicrophoneSlash} />
                </div>
              ) : null}
            </div>
            <div className="absolute right-2 w-[15px] h-[15px]">
              {!this.props.user.isLocal() && (
                <div id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <FontAwesomeIcon icon={faVolumeXmark} />
                  ) : (
                    <FontAwesomeIcon icon={faVolumeUp} />
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
