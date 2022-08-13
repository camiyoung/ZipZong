const tmPose = window.tmPose

const URL = {
  PUSHUP: "https://teachablemachine.withgoogle.com/models/7dJP87xxl",
  BURPEE: "https://teachablemachine.withgoogle.com/models/uaIa1x0IE",
  JUMPINGJACK: "https://teachablemachine.withgoogle.com/models/8CC3KBv-o",
  LATERALRAISE: "https://teachablemachine.withgoogle.com/models/8CC3KBv-o",
  LUNGE: "https://teachablemachine.withgoogle.com/models/zOp2xpfvZ",
  SQUAT: "https://teachablemachine.withgoogle.com/models/zOp2xpfvZ",
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

  loadedCount = 0

  constructor() {
    this.predictPushup = this.callbackPushup
    this.predictBurpee = this.callbackBurpee
    this.predictLegraise = this.callbackLegraise
    this.predictMountaingcliming = this.callbackMountaingcliming
    this.predictSquat = this.callbackSquat
  }
  async loadModel() {
    tmPose
      .load(URL["PUSHUP"] + "/model.json", URL["PUSHUP"] + "/metadata.json")
      .then((res) => {
        this.modelPushup = res
        console.log("푸시업 모델 로딩 완료")
        this.loadedCount++
      })
    tmPose
      .load(URL["BURPEE"] + "/model.json", URL["BURPEE"] + "/metadata.json")
      .then((res) => {
        this.modelBurpee = res
        console.log("버피 모델 로딩 완료")
        this.loadedCount++
      })

    tmPose
      .load(
        URL["LATERALRAISE"] + "/model.json",
        URL["LATERALRAISE"] + "/metadata.json"
      )
      .then((res) => {
        this.modelLateralraise = res
        this.modelJumpingjack = res
        console.log("사레레, 점핑잭 모델 로딩 완료")
        this.loadedCount += 2
      })

    tmPose
      .load(URL["SQUAT"] + "/model.json", URL["SQUAT"] + "/metadata.json")
      .then((res) => {
        this.modelSquat = res
        this.modelLunge = res
        console.log("스쿼트, 런지 모델 로딩 완료")
        this.loadedCount += 2
      })

    tmPose
      .load(URL["test"] + "/model.json", URL["test"] + "/metadata.json")
      .then((res) => {
        this.modelTest = res
        console.log("테스트 모델 로딩 완료")
        this.loadedCount++
      })
  }

  modelsLoaded() {
    return this.loadedCount === 7
  }

  // async loadModel() {
  //   this.modelPushup = await tmPose.load(
  //     URL["PUSHUP"] + "/model.json",
  //     URL["PUSHUP"] + "/metadata.json"
  //   )
  //   console.log("푸시업 모델 로딩 완료 :")
  //   this.modelBurpee = await tmPose.load(
  //     URL["BURPEE"] + "/model.json",
  //     URL["BURPEE"] + "/metadata.json"
  //   )
  //   console.log(" 버피 모델 로딩 완료 :")

  //   this.modelLateralraise = await tmPose.load(
  //     URL["LATERALRAISE"] + "/model.json",
  //     URL["LATERALRAISE"] + "/metadata.json"
  //   )
  //   this.modelJumpingjack = this.modelLateralraise
  //   console.log("사레레, 점핑잭 모델 로딩 완료 :")

  //   this.modelSquat = await tmPose.load(
  //     URL["SQUAT"] + "/model.json",
  //     URL["SQUAT"] + "/metadata.json"
  //   )

  //   this.modelLunge = this.modelSquat
  //   console.log("스쿼트, 런지 모델 로딩 완료 :")
  //   this.modelTest = await tmPose.load(
  //     URL["test"] + "/model.json",
  //     URL["test"] + "/metadata.json"
  //   )
  //   console.log("테스트 모델 로딩 완료 :")
  // }

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
    let count = 0
    const prob = parseInt(probability.toFixed(2))
    let correctDone = false
    if (prob === 1) {
      if (action === "Up") {
        if (beforeAction === "Down") {
          console.log("성공")
          count++ //운동 1회 카운트 진행하고, 기존 값 초기화
        }
      }
      if (count === 2) {
        count = 0
        correctDone = true
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
