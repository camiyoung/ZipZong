import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { openvidu } from "../../api/openvidu"
import { http } from "../../api/axios"

// const tmp_my = {
//   memberId: 5,
//   personalResultDetails: [
//     { exerciseName: "PUSHUP", targetNum: 10, performNum: 5 },
//     { exerciseName: "BURPEE", targetNum: 10, performNum: 5 },
//     { exerciseName: "JUMPINGJACK", targetNum: 10, performNum: 5 },
//     { exerciseName: "LATERALRAISE", targetNum: 10, performNum: 5 },
//     { exerciseName: "PUSHUP", targetNum: 10, performNum: 5 },
//     { exerciseName: "BURPEE", targetNum: 10, performNum: 5 },
//     { exerciseName: "JUMPINGJACK", targetNum: 10, performNum: 5 },
//     { exerciseName: "LATERALRAISE", targetNum: 10, performNum: 5 },
//     { exerciseName: "PUSHUP", targetNum: 10, performNum: 5 },
//     { exerciseName: "BURPEE", targetNum: 10, performNum: 5 },
//     { exerciseName: "JUMPINGJACK", targetNum: 10, performNum: 5 },
//     { exerciseName: "LATERALRAISE", targetNum: 10, performNum: 5 },
//   ],
//   percentage: 50,
// }

// const tmp_all = {
//   personalPercentages: [
//     { nickname: "천재지영", percentage: 100 },
//     { nickname: "닉네임", percentage: 80 },
//     { nickname: "ㅎㅎ??", percentage: 88 },
//     { nickname: "메롱", percentage: 70 },
//     { nickname: "닉넴이다", percentage: 30 },
//     { nickname: "천재지영", percentage: 100 },
//     { nickname: "닉네임", percentage: 80 },
//     { nickname: "ㅎㅎ??", percentage: 88 },
//     { nickname: "메롱", percentage: 70 },
//     { nickname: "닉넴이다", percentage: 30 },
//   ],
//   avgPercentage: 80,
// }

export const sendExerciseResult = createAsyncThunk(
  "exercise/result",
  async (result) => {
    const { data } = await http.post("/exercise/result", result)
    return data
  }
)

export const getSessionInfo = createAsyncThunk(
  "exercise/room",
  async (sessionId) => {
    const { data } = await openvidu.get(`/${sessionId}`)
    return data.connections.content
  }
)

export const getRoutineDetail = createAsyncThunk(
  "exercise/routineDetail",
  async (routineId) => {
    console.log("루틴 정보 가져오기 루틴 번호: ", routineId)
    const { data } = await http.get(`routine/detail/${routineId}`)
    return data.data
  }
)

export const exerciseReducer = createSlice({
  name: "exercise",
  initialState: {
    roomId: undefined,
    roomTitle: undefined,
    routine: undefined,
    admin: undefined,
    result: {
      myResult: undefined,
      allResult: undefined,
    },
    rotuineId: undefined,
    rotuineInfo: undefined,
    todoList: undefined,
    todoIndex: -1,
    successCount: 0,
    isExercising: false, //
    myPercentage: undefined,
  },
  reducers: {
    setRoomTitle: (state, action) => {
      state.roomTitle = action.payload
    },
    setMyExerciseResult: (state, action) => {
      state.result.myResult = action.payload
      const myres = state.result.myResult.personalResultDetails
      const res =
        myres.reduce(
          (prev, cur) =>
            prev + Math.ceil((cur.performNum / cur.targetNum) * 100),
          0
        ) / myres.length
      state.result.myResult.percentage = res.toFixed()
    },
    setAllExerciseResult: (state, action) => {
      state.result.allResult = action.payload
      const mynickname = localStorage.getItem("nickname")
      for (let i; i < state.result.allResult.personalPercentages.length; i++) {
        if (
          state.result.allResult.personalPercentages[i].nickname === mynickname
        ) {
          state.myPercentage = state.result.allResult[i].percentage
          break
        }
      }
    },
    setRoutine: (state, action) => {
      state.routineId = action.payload
    },
    setTeamId: (state, action) => {
      state.roomId = action.payload
    },
    setRoutineInfo: (state, action) => {
      state.rotuineInfo = action.payload
    },
    setExerciseStatus: (state, action) => {
      state.isExercising = action.payload
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload
      // console.log("todolist 변경", state.todoList)
    },
    updateSuccessCount: (state) => {
      state.successCount++
    },
    resetSuccessCount: (state) => {
      // console.log("카운트 초기화 ")
      state.successCount = 0
    },
    updateIndex: (state) => {
      state.todoIndex++
    },
    resetInfo: (state) => {
      state.todoIndex = -1
      state.rotuineInfo = undefined
    },
  },
  extraReducers(builder) {
    builder.addCase(getSessionInfo.fulfilled, (state, action) => {
      console.log(action.payload)
      const users = action.payload
      const admin = users.find((user) => {
        const userData = JSON.parse(user.clientData)
        return userData.admin
      })
      state.admin = admin
      // console.log("방장 connectionId:", admin.id, admin)
    })
    builder.addCase(getSessionInfo.rejected, (err) => {
      console.log(err)
    })
    builder.addCase(sendExerciseResult.fulfilled, (state, action) => {
      state.result.allResult = action.payload
    })
    builder.addCase(getRoutineDetail.fulfilled, (state, action) => {
      // console.log("루틴 변경 ", action.payload)
      state.rotuineInfo = action.payload
    })
  },
})

export const getAdminId = (state) => state.exercise.admin
export const getResults = (state) => state.exercise.result
export const hasResult = (state) => {}
export default exerciseReducer.reducer
export const {
  setAllExerciseResult,
  setMyExerciseResult,
  setRoutine,
  setTeamId,
  setRoutineInfo,
  setExerciseStatus,
  setTodoList,
  updateSuccessCount,
  resetSuccessCount,
  updateIndex,
  setRoomTitle,
  resetInfo,
} = exerciseReducer.actions
