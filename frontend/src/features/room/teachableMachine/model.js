const tmPose = window.tmPose

const URL = {
  pushup: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  burpee: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  legraise: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  mountaingcliming: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  squat: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
}

export class Model {
  modelPushup = undefined
  modelBurpee = undefined
  modelLegraise = undefined
  modelMountaingcliming = undefined
  modelSquat = undefined
  predictPushup = undefined
  predictBurpee = undefined
  predictLegraise = undefined
  predictMountaingcliming = undefined
  predictSquat = undefined

  constructor() {
    this.predictPushup = this.callbackPushup
    this.predictBurpee = this.callbackBurpee
    this.predictLegraise = this.callbackLegraise
    this.predictMountaingcliming = this.callbackMountaingcliming
    this.predictSquat = this.callbackSquat
  }

  async loadModel() {
    this.modelPushup = await tmPose.load(
      URL["pushup"] + "/model.json",
      URL["pushup"] + "/metadata.json"
    )
    // this.modelBurpee = await tmPose.load(
    //   URL["burpee"] + "/model.json",
    //   URL["burpee"] + "/metadata.json"
    // )
    // this.modelLegraise = await tmPose.load(
    //   URL["legraise"] + "/model.json",
    //   URL["legraise"] + "/metadata.json"
    // )
    // this.modelMountaingcliming = await tmPose.load(
    //   URL["mountaingcliming"] + "/model.json",
    //   URL["mountaingcliming"] + "/metadata.json"
    // )
    // this.modelSquat = await tmPose.load(
    //   URL["squat"] + "/model.json",
    //   URL["squat"] + "/metadata.json"
    // )
    console.log("모델 로딩 완료 :", this.modelPushup)
  }

  callbackPushup({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackPushup()")

    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob === 1) {
      if (action === "Sleepy_Right") {
        if (beforeAction === "Sleepy_Left") {
          console.log("성공")
          correctDone = true
        }
      }
      changeAction(action)
    }

    return correctDone
  }
  callbackBurpee() {
    console.log("callbackBurpee()")
  }
  callbackLegraise() {
    console.log("callbackLegraise()")
  }
  callbackMountaingcliming() {
    console.log("callbackMountaingcliming()")
  }
  callbackSquat() {
    console.log("callbackSquat()")
  }
}
