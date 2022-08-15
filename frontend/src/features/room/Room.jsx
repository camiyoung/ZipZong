import React, { Component } from "react"
import axios from "axios"
import "./VideoRoomComponent.css"
import { OpenVidu } from "openvidu-browser"
import StreamComponent from "./openVidu/stream/StreamComponent"
import UserModel from "./openVidu/user-model.js"
import ToolbarComponent from "./openVidu/toolbar/ToolbarComponent"
import ChatComponent from "./openVidu/chat/ChatComponent"
// ---------------------------------
import ExerciseZone from "./ExerciseZone"
import OtherPeople from "./OtherPeople"
import SideBar from "./SideBar"
import { Model } from "./teachableMachine/model"
import { Spinner } from "../../components/spinner/Spinner"
import AlertModal from "./AlertModal"
import { http } from "../../api/axios"

const localUser = new UserModel()
const tmModel = new Model()

class Room extends Component {
  constructor(props) {
    super(props)

    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : "https://i7a805.p.ssafy.io:8443"

    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "MY_SECRET"
    this.hasBeenUpdated = false
    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : "testRoom"
    let userName = this.props.user ? this.props.user : "guest"

    // localUser.setIcon = this.props.icon
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
      isRoomAdmin: false,
      tmModel: undefined,
      modelLoded: false,
      alert: undefined,
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

  async componentDidMount() {
    this.sessionName = this.props.sessionName
    console.log(
      "유저 네임 : ",
      this.props.user ?? localStorage.getItem("nickname")
    )
    window.addEventListener("beforeunload", this.onbeforeunload)
    await tmModel.loadModel() // teachable machine 로드

    setTimeout(() => {
      this.setState({ modelLoded: true })
    }, 5000)
    this.joinSession()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize)
    this.leaveSession()
  }

  onbeforeunload(event) {
    this.leaveSession()
  }

  joinSession() {
    // console.log("세션 id:", this.sessionName)
    console.log("joinSession 시작 세션 ID:", this.sessionName)
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
      .connect(token, {
        clientData: this.state.myUserName,
        admin: this.state.isRoomAdmin,
      })
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
    localUser.setNickname(this.props.user ?? localStorage.getItem("nickname"))
    localUser.setConnectionId(this.state.session.connection.connectionId)
    localUser.setScreenShareActive(false)
    localUser.setStreamManager(publisher)
    // console.log(localUser)
    localUser.setIcon(this.props.icon)
    this.subscribeToUserChanged()
    this.subscribeToStreamDestroyed()
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    })

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        console.log(
          "내 connectionID",
          this.state.localUser.getConnectionId(),
          "닉네임",
          this.state.localUser.getNickname(),
          "아이콘",
          this.state.localUser.getUserIcon()
        )
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
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
      }
    )
  }

  leaveSession() {
    const mySession = this.state.session
    const nickname = this.state.localUser.getNickname()
    console.log(
      "퇴장할거야 ",
      this.state.localUser.getNickname(),
      mySession.sessionId
    )
    http
      .delete(`/room/${mySession.sessionId}/leave/${nickname}`)
      .then((res) => {
        console.log("방을 퇴장합니다.", res.data)
      })
      .catch((error) => {
        console.log(error)
      })

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
      // console.log("새 유저 참여:", event)
      // console.log("세션 정보 :", this.state.session)
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
      const user = event.stream.connection
      const data = JSON.parse(user.data)
      const isAdmin = data.admin

      if (isAdmin) {
        const signalOptions = {
          data: "방장 퇴장",
          type: "exit",
        }
        this.state.session.signal(signalOptions)
      }
      console.log("유저 퇴장- uid:", user.connectionId, "방장?:", data.admin)
      this.deleteSubscriber(event.stream)

      event.preventDefault()
    })
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data)
          // console.log("EVENTO REMOTE: ", event.data)
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

  sendSignalUserChanged(data) {
    // console.log("시그널 보내기", data)
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

  checkSomeoneShareScreen() {}

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

  setAlert = (type) => {
    this.setState({ alert: { type } }, () => {
      console.log(this.state.alert)
    })
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
      <div className="h-full">
        {!this.state.modelLoded ? (
          <div className="h-full flex  flex-col items-center justify-center">
            <Spinner />
            <div className="text-secondary-200">운동방에 입장 중입니다.</div>
          </div>
        ) : (
          <div className="flex h-full bg-secondary-200 rounded-2xl shadow-inner ">
            {this.state.alert?.type === "error" && (
              <AlertModal
                title={"방장이 퇴장했습니다."}
                message={[
                  "운동이 종료됩니다.",
                  "이 운동은 기록에 저장되지 않습니다.",
                ]}
                type="error"
              />
            )}
            {this.state.alert?.type === "alert" && (
              <AlertModal
                title={"운동 기록을 저장중입니다."}
                message={[
                  "저장이 완료되면 자동으로 결과 페이지로 이동합니다.",
                  "현재 페이지를 닫지 말고 잠시만 기다려주세요.",
                ]}
                type="alret"
              />
            )}
            <div className="w-1/6  min-w-[300px] p-3" id="subscribersArea">
              <OtherPeople subscribers={this.state.subscribers} />
            </div>

            <div className="w-4/6" id="ExerciseZoneArea">
              {this.state.localUser !== undefined &&
                this.state.localUser.getStreamManager() !== undefined && (
                  <ExerciseZone
                    Toolbar={Toolbar}
                    myVideo={myVideoStream}
                    chat={chatComponent}
                    isRoomAdmin={this.state.isRoomAdmin}
                    tmModel={tmModel}
                    user={this.state.localUser}
                    setAlert={this.setAlert}
                    leaveRoom={this.leaveSession}
                  />
                )}
            </div>
            <div className="w-1/6  min-w-[300px]   " id="sideBarArea">
              {this.state.localUser !== undefined &&
                this.state.localUser.getStreamManager() !== undefined && (
                  <SideBar
                    chatComponent={chatComponent}
                    user={this.state.localUser}
                    isRoomAdmin={this.state.isRoomAdmin}
                    tmModel={tmModel}
                  />
                )}
            </div>
          </div>
        )}
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
      // console.log("크리에이트 세션의 body :", data)
      axios
        .post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("새로운 방 생성 ", this.props.roomTitle)
          localUser.setRole("admin")
          this.setState({ isRoomAdmin: true })
          const roomtitle = this.props.roomTitle
            ? this.props.roomTitle
            : "운동합시다~"
          const nick = this.props.user || localStorage.getItem("nickname")
          http.post(`room/${sessionId}`, {
            roomName: roomtitle,
            mode: "EXERCISE",
            routineId: 1,
            creator: nick,
          })
          resolve(response.data.id)
        })
        .catch((response) => {
          var error = Object.assign({}, response)
          if (error.response && error.response.status === 409) {
            const nick = this.props.user || localStorage.getItem("nickname")
            http.post(`room/${sessionId}/enter/${nick}`).then((res) => {
              console.log("참여 완료 :", res)
            })

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
