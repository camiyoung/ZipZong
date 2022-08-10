class UserModel {
  connectionId
  audioActive
  videoActive
  screenShareActive
  nickname
  streamManager
  type // 'remote' | 'local'
  role //"admin | user "
  icon

  constructor() {
    this.connectionId = ""
    this.audioActive = true
    this.videoActive = true
    this.screenShareActive = false
    this.nickname = ""
    this.streamManager = null
    this.type = "local"
    this.type = "user"
    this.icon = "basic"
  }

  isAudioActive() {
    return this.audioActive
  }

  isVideoActive() {
    return this.videoActive
  }

  isScreenShareActive() {
    return this.screenShareActive
  }

  getConnectionId() {
    return this.connectionId
  }

  getNickname() {
    return this.nickname
  }
  getUserIcon() {
    return this.icon
  }

  getStreamManager() {
    return this.streamManager
  }

  isLocal() {
    return this.type === "local"
  }
  isRemote() {
    return !this.isLocal()
  }

  isAdmin() {
    return this.role === "admin"
  }

  setAudioActive(isAudioActive) {
    this.audioActive = isAudioActive
  }
  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive
  }
  setScreenShareActive(isScreenShareActive) {
    this.screenShareActive = isScreenShareActive
  }
  setStreamManager(streamManager) {
    this.streamManager = streamManager
  }

  setConnectionId(conecctionId) {
    this.connectionId = conecctionId
  }
  setNickname(nickname) {
    this.nickname = nickname
  }
  setType(type) {
    if ((type === "local") | (type === "remote")) {
      this.type = type
    }
  }
  setRole(role) {
    if ((role === "admin") | (role === "user")) this.role = role
  }
  setIcon(icon) {
    if (icon !== undefined) this.icon = icon
  }
}

export default UserModel
