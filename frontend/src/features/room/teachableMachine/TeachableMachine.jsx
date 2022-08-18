import React, { Component } from "react"

const tmPose = window.tmPose

export default class TeachableMachine extends Component {
  constructor(props) {
    super(props)
    this.modelURL =
      "https://teachablemachine.withgoogle.com/models/L71vjtyQV/model.json"
    this.metadataURL =
      "https://teachablemachine.withgoogle.com/models/L71vjtyQV/metadata.json"
    this.webcam = undefined
    this.maxPredictions = undefined
    this.model = undefined
    this.predictionElement = undefined
    this.state = {
      resEle: undefined,
      successCount: 0,
      ctx: undefined,
    }
    this.beforAction = undefined
    this.videoRef = undefined
    // this.canvasRef = React.createRef()
    // this.canvas = undefined
    this.tmModel = undefined
    this.changeAction = this.changeAction.bind(this)
    this.predicFunction = undefined
  }

  componentDidMount() {
    // console.log("티처블머신 컴포넌트 마운트", this.props.actionName)
    // console.log(
    //   "티처블머신 컴포넌트 마운트",
    //   this.props.user.getStreamManager().videos[0].video
    // )
    this.videoRef = this.props.user.getStreamManager().videos[0].video
    this.tmModel = this.props.tmModel

    this.makeModel()
  }

  componentWillUnmount() {
    // console.log("티처블머신 컴포넌트 언마운트 ")
    this.props.updateSuccess()
  }

  async makeModel() {
    switch (this.props.actionName) {
      case "PUSHUP":
        this.model = this.tmModel.modelPushup
        this.predicFunction = this.tmModel.callbackPushup
        break
      case "BURPEE":
        this.model = this.tmModel.modelBurpee
        this.predicFunction = this.tmModel.callbackBurpee
        break
      case "JUMPINGJACK":
        this.model = this.tmModel.modelJumpingjack
        this.predicFunction = this.tmModel.callbackJumpingjack
        break
      case "LATERALRAISE":
        this.model = this.tmModel.modelLateralraise
        this.predicFunction = this.tmModel.callbackLateralraise
        break
      case "LUNGE":
        this.model = this.tmModel.modelLunge
        this.predicFunction = this.tmModel.callbackLunge
        break
      case "SQUAT":
        this.model = this.tmModel.modelSquat
        this.predicFunction = this.tmModel.callbackSquat
        break

      default:
        this.model = this.tmModel.modelTest
        this.predicFunction = this.tmModel.callbackTest
        break
    }

    // this.model = this.tmModel.modelPushup
    this.maxPredictions = this.model.getTotalClasses()
    await this.init()
    this.loop()
  }

  async init() {
    this.videoRef.width = this.videoRef.offsetWidth
    this.videoRef.height = this.videoRef.offsetHeight
    // this.canvas = this.canvasRef.current
    // this.canvas.width = this.videoRef.width
    // this.canvas.height = this.videoRef.height
    // this.setState({ ctx: this.canvas.getContext("2d") })
  }

  async loop() {
    // console.log("자세 분석 동작중 ")

    await this.predict()
    this.loop()
  }

  async predict() {
    const { pose, posenetOutput } = await this.model.estimatePose(this.videoRef)
    const prediction = await this.model.predict(posenetOutput)
    // const predictionsList = prediction.map((res, i) => (
    //   <div key={i}>
    //     <span className=" text-4xl font-bold">
    //       {res.className} : {res.probability.toFixed(2)}
    //     </span>
    //   </div>
    // ))
    // console.log("리스트", predictionsList)
    // this.drawPose(pose)
    // this.setState({ resEle: predictionsList })
    this.updateCount(prediction)
  }

  changeAction(action) {
    this.beforAction = action
  }

  updateCount(data) {
    data.forEach((res) => {
      const doneAction = this.predicFunction(
        res,
        this.beforAction,
        this.changeAction
      )

      if (doneAction) {
        this.setState(
          (state) => ({
            successCount: state.successCount + 1,
          }),
          () => {
            this.props.countSuccess()
          }
        )
      }
    })
  }

  drawPose(pose) {
    if (pose) {
      this.state.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      const minPartConfidence = 0.5
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.state.ctx)
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.state.ctx)
    }
  }

  render() {
    return (
      <div className="w-full h-full absolute z-20">
        {/* <div className="w-[300px] h-[200px] bg-white absolute right-0 border-4">
          {this.state.resEle && (
            <div>
              {this.state.resEle}
              count: {this.state.successCount}
            </div>
          )}
        </div> */}
        {/* <canvas ref={this.canvasRef} className="z-50 -scale-x-[1]"></canvas> */}
      </div>
    )
  }
}
