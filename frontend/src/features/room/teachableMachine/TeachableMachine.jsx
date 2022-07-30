import React, { Component } from "react"
import * as tf from "@tensorflow/tfjs"
import * as tmPose from "@teachablemachine/pose"

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
    }
    this.beforAction = undefined
  }

  componentDidMount() {
    console.log("비디오 프롭", this.props.video)
    this.makeModel()
  }

  async makeModel() {
    this.model = await tmPose.load(this.modelURL, this.metadataURL)
    this.maxPredictions = this.model.getTotalClasses()
    console.log("최대 예측값:", this.maxPredictions)
    console.log("모델:", this.model)
    this.loop()
  }

  async loop() {
    await this.predict()
    this.loop()
  }

  async predict() {
    const { pose, posenetOutput } = await this.model.estimatePose(
      this.props.video
    )
    const prediction = await this.model.predict(posenetOutput)
    const predictionsList = prediction.map((res) => (
      <div>
        {res.className} : {res.probability.toFixed(2)}
      </div>
    ))
    // console.log("리스트", predictionsList)
    this.setState({ resEle: predictionsList })
    this.updateCount(prediction)
  }
  updateCount(data) {
    data.forEach(({ className, probability }) => {
      //   console.log(className + ":" + probability)
      const action = className
      const prob = probability.toFixed(2)
      //   console.log(action)
      if (prob == 1) {
        // console.log("현재동작:", action, "이전 동작", this.beforAction)
        if (action === "Sleepy_Right") {
          if (this.beforAction === "Sleepy_Left") {
            console.log("성공")
            // this.beforAction = "Sleepy_Left"
            this.setState((state) => ({
              successCount: state.successCount + 1,
            }))
          }
        }
        this.beforAction = action
      }
    })
  }

  render() {
    return (
      <div className="w-full h-full absolute z-20">
        <div className="w-[200px] h-[400px] bg-white absolute right-0 border-4">
          {this.state.resEle}
          count: {this.state.successCount}
        </div>
      </div>
    )
  }
}
