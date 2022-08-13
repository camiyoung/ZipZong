const tmPose = window.tmPose

const URL = {
  // PUSHUP: "https://teachablemachine.withgoogle.com/models/7dJP87xxl",
  // BURPEE: "https://teachablemachine.withgoogle.com/models/uaIa1x0IE",
  // JUMPINGJACK: "https://teachablemachine.withgoogle.com/models/-sn7kthp3",
  // LATERALRAISE: "https://teachablemachine.withgoogle.com/models/8CC3KBv-o",
  // LUNGE: "https://teachablemachine.withgoogle.com/models/zTl0H1MCd",
  // SQUAT: "https://teachablemachine.withgoogle.com/models/zOp2xpfvZ",
  // test: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",

  PUSHUP: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  BURPEE: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  JUMPINGJACK: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  LATERALRAISE: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  LUNGE: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  SQUAT: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
  test: "https://teachablemachine.withgoogle.com/models/L71vjtyQV",
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
    // this.modelPushup = await tmPose.load(
    //   URL["PUSHUP"] + "/model.json",
    //   URL["PUSHUP"] + "/metadata.json"
    // )
    // this.modelBurpee = await tmPose.load(
    //   URL["BURPEE"] + "/model.json",
    //   URL["BURPEE"] + "/metadata.json"
    // )
    // this.modelJumpingjack = await tmPose.load(
    //   URL["JUMPINGJACK"] + "/model.json",
    //   URL["JUMPINGJACK"] + "/metadata.json"
    // )
    // this.modelLateralraise = await tmPose.load(
    //   URL["LATERALRAISE"] + "/model.json",
    //   URL["LATERALRAISE"] + "/metadata.json"
    // )
    // this.modelLunge = await tmPose.load(
    //   URL["LUNGE"] + "/model.json",
    //   URL["LUNGE"] + "/metadata.json"
    // )
    // this.modelSquat = await tmPose.load(
    //   URL["SQUAT"] + "/model.json",
    //   URL["SQUAT"] + "/metadata.json"
    // )
    this.modelTest = await tmPose.load(
      URL["test"] + "/model.json",
      URL["test"] + "/metadata.json"
    )
    console.log("모델 로딩 완료 :")
  }

  callbackTest({ className, probability }, beforeAction, changeAction) {
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
  callbackJumpingjack({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackJumpingjack()")

    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob === 1) {
      if (action === "Jump") {
        if (beforeAction === "Spread_Arms") {
          console.log("성공")
          correctDone = true
        }
      }
      changeAction(action)
    }

    return correctDone
  }

  callbackBurpee({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackBurpee()")

    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob === 1) {
      if (action === "Push_Up") {
        if (beforeAction === "Stand_Up") {
          console.log("성공")
          correctDone = true
        }
      }
      changeAction(action)
    }

    return correctDone
  }
  callbackPushup({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackPushup()")

    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob >= 0.9) {
      if (action === "Push_Down") {
        if (beforeAction === "Push_Up") {
          console.log("성공")
          correctDone = true
        }
      }
      changeAction(action)
    }

    return correctDone
  }
  callbackSquat({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackSquat()")

    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob === 1) {
      if (action === "Squat") {
        if (beforeAction === "Stand_Up") {
          console.log("성공")
          correctDone = true
        }
      }
      changeAction(action)
    }

    return correctDone
  }
  callbackLunge({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackLunge()")

    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob === 1) {
      if (action === "Down") {
        if (beforeAction === "Up") {
          console.log("성공")
          correctDone = true
        }
      }
      changeAction(action)
    }

    return correctDone
  }
  callbackLateralraise({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackLateralraise()")

    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob === 1) {
      if (action === "Up") {
        if (beforeAction === "Down") {
          console.log("성공")
          correctDone = true
        }
      }
      changeAction(action)
    }

    return correctDone
  }
}
