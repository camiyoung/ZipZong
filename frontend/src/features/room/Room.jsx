import React, { Component } from "react"
import axios from "axios"
import "./VideoRoomComponent.css"
import { OpenVidu } from "openvidu-browser"
import StreamComponent from "./openVidu/stream/StreamComponent"
import UserModel from "./openVidu/user-model.js"
import ToolbarComponent from "./openVidu/toolbar/ToolbarComponent"
import ChatComponent from "./openVidu/chat/ChatComponent"
// ---------------------------------
import InfoBar from "./InfoBar"
import MyExercise from "./MyExercise"
import OtherPeople from "./OtherPeople"

const localUser = new UserModel()

class Room extends Component {
  constructor(props) {
    super(props)
    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : "https://3.39.251.36:443"
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "MY_SECRET"
    this.hasBeenUpdated = false
    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : "SessionA"
    let userName = this.props.user
      ? this.props.user
      : "OpenVidu_User" + Math.floor(Math.random() * 100)
    this.remotes = []
    this.localUserAccessAllowed = false
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "block",
      currentVideoDevice: undefined,
    }
    this.myVideoRef = React.createRef()

    this.joinSession = this.joinSession.bind(this)
    this.leaveSession = this.leaveSession.bind(this)
    this.onbeforeunload = this.onbeforeunload.bind(this)
    // this.updateLayout = this.updateLayout.bind(this)
    this.camStatusChanged = this.camStatusChanged.bind(this)
    this.micStatusChanged = this.micStatusChanged.bind(this)
    this.nicknameChanged = this.nicknameChanged.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.switchCamera = this.switchCamera.bind(this)
    this.screenShare = this.screenShare.bind(this)
    this.stopScreenShare = this.stopScreenShare.bind(this)
    this.closeDialogExtension = this.closeDialogExtension.bind(this)
    this.toggleChat = this.toggleChat.bind(this)
    this.checkNotification = this.checkNotification.bind(this)
    this.checkSize = this.checkSize.bind(this)
  }

  componentDidMount() {
    // const openViduLayoutOptions = {
    //   maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
    //   minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
    //   fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
    //   bigClass: "OV_big", // The class to add to elements that should be sized bigger
    //   bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
    //   bigFixedRatio: false, // fixedRatio for the big ones
    //   bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
    //   bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
    //   bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
    //   animate: true, // Whether you want to animate the transitions
    // }

    // this.layout.initLayoutContainer(
    //   document.getElementById("layout"),
    //   openViduLayoutOptions
    // )
    window.addEventListener("beforeunload", this.onbeforeunload)
    // window.addEventListener("resize", this.updateLayout)
    // window.addEventListener("resize", this.checkSize)
    this.joinSession()
  }

  componentWillUnmount() {
    // window.removeEventListener("beforeunload", this.onbeforeunload)
    // window.removeEventListener("resize", this.updateLayout)
    window.removeEventListener("resize", this.checkSize)
    this.leaveSession()
  }

  onbeforeunload(event) {
    this.leaveSession()
  }

  joinSession() {
    this.OV = new OpenVidu()
    this.OV.enableProdMode()

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated()
        this.connectToSession()
      }
    )
  }

  connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token)
      this.connect(this.props.token)
    } else {
      this.getToken()
        .then((token) => {
          console.log("Get토큰", token)
          this.connect(token)
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            })
          }
          console.log(
            "There was an error getting the token:",
            error.code,
            error.message
          )
          alert("There was an error getting the token:", error.message)
        })
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam()
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          })
        }
        alert("There was an error connecting to the session:", error.message)
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        )
      })
  }

  async connectWebCam() {
    //카메라 접근 요청창을 위함
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    })

    const devices = await this.OV.getDevices()
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    )

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
      mirror: true,
    })

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers()
          this.localUserAccessAllowed = true
          if (this.props.joinSession) {
            this.props.joinSession()
          }
        })
      })
    }
    localUser.setNickname(this.state.myUserName)
    localUser.setConnectionId(this.state.session.connection.connectionId)
    localUser.setScreenShareActive(false)
    localUser.setStreamManager(publisher)
    this.subscribeToUserChanged()
    this.subscribeToStreamDestroyed()
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    })

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          // this.updateLayout()
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          )
        })
      }
    )
  }

  updateSubscribers() {
    var subscribers = this.remotes
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          })
        }
        // this.updateLayout()
      }
    )
  }

  leaveSession() {
    const mySession = this.state.session

    if (mySession) {
      mySession.disconnect()
    }

    // Empty all properties...
    this.OV = null
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
    })
    if (this.props.leaveSession) {
      this.props.leaveSession()
    }
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive())
    localUser.getStreamManager().publishVideo(localUser.isVideoActive())
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() })
    this.setState({ localUser: localUser })
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive())
    localUser.getStreamManager().publishAudio(localUser.isAudioActive())
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() })
    this.setState({ localUser: localUser })
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser
    localUser.setNickname(nickname)
    this.setState({ localUser: localUser })
    this.sendSignalUserChanged({ nickname: this.state.localUser.getNickname() })
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0]
    let index = remoteUsers.indexOf(userStream, 0)
    if (index > -1) {
      remoteUsers.splice(index, 1)
      this.setState({
        subscribers: remoteUsers,
      })
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined)
      console.log("새 유저 참여:", subscriber)
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen()
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        )
      })
      const newUser = new UserModel()
      newUser.setStreamManager(subscriber)
      newUser.setConnectionId(event.stream.connection.connectionId)
      newUser.setType("remote")
      const nickname = event.stream.connection.data.split("%")[0]
      newUser.setNickname(JSON.parse(nickname).clientData)
      this.remotes.push(newUser)
      if (this.localUserAccessAllowed) {
        this.updateSubscribers()
      }
    })
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream)
      setTimeout(() => {
        this.checkSomeoneShareScreen()
      }, 20)
      event.preventDefault()
      // this.updateLayout()
    })
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data)
          console.log("EVENTO REMOTE: ", event.data)
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive)
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive)
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname)
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive)
          }
        }
      })
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      )
    })
  }

  // updateLayout() {
  //   setTimeout(() => {
  //     this.layout.updateLayout()
  //   }, 20)
  // }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    }
    this.state.session.signal(signalOptions)
  }

  toggleFullscreen() {
    const document = window.document
    const fs = document.getElementById("container")
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen()
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen()
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen()
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices()
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      )

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        )

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          })

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager()
          )
          await this.state.session.publish(newPublisher)
          this.state.localUser.setStreamManager(newPublisher)
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen"
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true })
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing")
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension")
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share")
        }
      }
    )

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager())
      localUser.setStreamManager(publisher)
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true)
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          })
        })
      })
    })
    publisher.on("streamPlaying", () => {
      // this.updateLayout()
      publisher.videos[0].video.parentElement.classList.remove("custom-class")
    })
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false })
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager())
    this.connectWebCam()
  }

  checkSomeoneShareScreen() {
    // let isScreenShared
    // // return true if at least one passes the test
    // isScreenShared =
    //   this.state.subscribers.some((user) => user.isScreenShareActive()) ||
    //   localUser.isScreenShareActive()
    // const openviduLayoutOptions = {
    //   maxRatio: 3 / 2,
    //   minRatio: 9 / 16,
    //   fixedRatio: isScreenShared,
    //   bigClass: "OV_big",
    //   bigPercentage: 0.8,
    //   bigFixedRatio: false,
    //   bigMaxRatio: 3 / 2,
    //   bigMinRatio: 9 / 16,
    //   bigFirst: true,
    //   animate: true,
    // }
    // this.layout.setLayoutOptions(openviduLayoutOptions)
    // this.updateLayout()
  }

  toggleChat(property) {
    let display = property

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none"
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false })
    } else {
      console.log("chat", display)
      this.setState({ chatDisplay: display })
    }
    // this.updateLayout()
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    })
  }
  checkSize() {
    if (
      document.getElementById("layout").offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat("none")
      this.hasBeenUpdated = true
    }
    if (
      document.getElementById("layout").offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false
    }
  }

  render() {
    const mySessionId = this.state.mySessionId
    const localUser = this.state.localUser
    var chatDisplay = { display: this.state.chatDisplay }
    const Toolbar = (
      <ToolbarComponent
        sessionId={mySessionId}
        user={localUser}
        showNotification={this.state.messageReceived}
        camStatusChanged={this.camStatusChanged}
        micStatusChanged={this.micStatusChanged}
        screenShare={this.screenShare}
        stopScreenShare={this.stopScreenShare}
        toggleFullscreen={this.toggleFullscreen}
        switchCamera={this.switchCamera}
        leaveSession={this.leaveSession}
        toggleChat={this.toggleChat}
      />
    )

    const myVideoStream =
      localUser !== undefined && localUser.getStreamManager() !== undefined ? (
        <StreamComponent
          user={localUser}
          handleNickname={this.nicknameChanged}
          myVideoRef={this.myVideoRef}
        />
      ) : null

    const chatComponent =
      localUser !== undefined && localUser.getStreamManager() !== undefined ? (
        <div className="OT_root OT_publisher custom-class" style={chatDisplay}>
          <ChatComponent
            user={localUser}
            chatDisplay={this.state.chatDisplay}
            close={this.toggleChat}
            messageReceived={this.checkNotification}
          />
        </div>
      ) : null
    return (
      <div className="flex h-full bg-secondary-200 rounded-2xl">
        {/* <InfoBar /> */}
        <OtherPeople subscribers={this.state.subscribers} />
        <MyExercise
          Toolbar={Toolbar}
          myVideo={myVideoStream}
          chat={chatComponent}
        />
      </div>
    )
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    )
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId })
      console.log("크리에이트 세션의 body :", data)
      axios
        .post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response)
          resolve(response.data.id)
        })
        .catch((response) => {
          var error = Object.assign({}, response)
          if (error.response && error.response.status === 409) {
            resolve(sessionId)
          } else {
            console.log(error)
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                this.OPENVIDU_SERVER_URL
            )
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + "/accept-certificate"
              )
            }
          }
        })
    })
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({})
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response)
          resolve(response.data.token)
        })
        .catch((error) => reject(error))
    })
  }
}

export default Room

// export default function Room() {
//   return (
//     <div className="flex flex-col h-full">
//       <InfoBar />
//       <MyExercise />
//       <OtherPeople />
//     </div>
//   )
// }
