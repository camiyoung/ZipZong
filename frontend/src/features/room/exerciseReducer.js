import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { openvidu } from "../../api/openvidu"
import { http } from "../../api/axios"
import tmpResult from "./tmpdata"

export const sendExerciseResult = createAsyncThunk(
  "exercise/result",
  async (result) => {
    const { data } = await http.post("/exercise/result", result)
    return data
  }
)

export const getSessionInfo = createAsyncThunk("exercise/room", async () => {
  const { data } = await openvidu.get(`/SessionA`)
  //   console.log(data)
  return data.connections.content
})

export const exerciseReducer = createSlice({
  name: "exercise",
  initialState: {
    roomId: undefined,
    routine: undefined,
    admin: undefined,
    result: tmpResult,
  },
  reducers: {
    setMyExerciseResult: (state, action) => {
      state.result.myResult = action.payload
    },
    setAllExerciseResult: (state, action) => {
      state.result.allResult = action.payload
    },
    setRoutine: (state, action) => {
      state.routine = action.payload
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
      console.log("방장 connectionId:", admin.id, admin)
    })
    builder.addCase(getSessionInfo.rejected, (err) => {
      console.log(err)
    })
    builder.addCase(sendExerciseResult.fulfilled, (state, action) => {
      state.result.allResult = action.payload
    })
  },
})

export const getAdminId = (state) => state.exercise.admin
export const getResults = (state) => state.exercise.result
export default exerciseReducer.reducer
export const { setAllExerciseResult, setMyExerciseResult, setRoutine } =
  exerciseReducer.actions
