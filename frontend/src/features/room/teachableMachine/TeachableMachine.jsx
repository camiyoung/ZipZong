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
    this.canvasRef = React.createRef()
    this.canvas = undefined
    this.tmModel = undefined
    this.changeAction = this.changeAction.bind(this)
  }

  componentDidMount() {
    this.videoRef = this.props.myVideoRef
    this.tmModel = this.props.tmModel

    this.makeModel()
  }

  componentWillUnmount() {
    console.log("티처블머신 컴포넌트 언마운트 ")
    this.props.updateSuccess(this.state.successCount)
  }

  async makeModel() {
    // this.model = await tmPose.load(this.modelURL, this.metadataURL)
    this.model = this.tmModel.modelPushup
    this.maxPredictions = this.model.getTotalClasses()
    // console.log("최대 예측값:", this.maxPredictions)
    // console.log("모델:", this.model)
    await this.init()
    this.loop()
  }

  async init() {
    this.videoRef.current.width = this.videoRef.current.offsetWidth
    this.videoRef.current.height = this.videoRef.current.offsetHeight
    this.canvas = this.canvasRef.current
    // console.log("캔버스", this.canvas)
    this.canvas.width = this.videoRef.current.width
    this.canvas.height = this.videoRef.current.height
    this.setState({ ctx: this.canvas.getContext("2d") })
  }

  async loop() {
    // console.log("자세 분석 동작중 ")

    await this.predict()
    this.loop()
  }

  async predict() {
    // console.log("REF:", this.videoRef)

    // const video = this.videoRef.current
    const { pose, posenetOutput } = await this.model.estimatePose(
      this.videoRef.current
    )
    // console.log(pose)
    const prediction = await this.model.predict(posenetOutput)
    const predictionsList = prediction.map((res, i) => (
      <div key={i}>
        {res.className} : {res.probability.toFixed(2)}
      </div>
    ))
    // console.log("리스트", predictionsList)
    this.drawPose(pose)
    this.setState({ resEle: predictionsList })
    this.updateCount(prediction)
  }

  changeAction(action) {
    this.beforAction = action
  }

  updateCount(data) {
    data.forEach((res) => {
      const doneAction = this.tmModel.callbackPushup(
        res,
        this.beforAction,
        this.changeAction
      )

      if (doneAction) {
        this.setState((state) => ({
          successCount: state.successCount + 1,
        }))
      }

      //   console.log(className + ":" + probability)
      // const action = className
      // const prob = parseInt(probability.toFixed(2))
      // //   console.log(action)
      // if (prob === 1) {
      //   // console.log("현재동작:", action, "이전 동작", this.beforAction)
      //   if (action === "Sleepy_Right") {
      //     if (this.beforAction === "Sleepy_Left") {
      //       console.log("성공")
      //       // this.beforAction = "Sleepy_Left"
      //       this.setState((state) => ({
      //         successCount: state.successCount + 1,
      //       }))
      //     }
      //   }
      //   this.beforAction = action
      // }
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
        <div className="w-[200px] h-[200px] bg-white absolute right-0 border-4">
          {this.state.resEle && (
            <div>
              {this.state.resEle}
              count: {this.state.successCount}
            </div>
          )}
        </div>
        <canvas ref={this.canvasRef} className="z-50 -scale-x-[1]"></canvas>
      </div>
    )
  }
}
