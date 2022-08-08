import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 그룹 루틴 조회
export const getRoutine = createAsyncThunk("routine/search", async (teamId) => {
  const res = await http.get(`routine/${teamId}`)
  console.log("그룹 루틴 조회", res.data)
  return res.data
})

// 그룹 루틴 생성
export const createRoutine = createAsyncThunk(
  "routine/create",
  async (info) => {
    await http.post(`routine/${info.teamId}`, info.routine)
    const res = await http.get(`routine/${info.teamId}`)
    console.log("그룹 루틴 생성", res.data)
    return res.data
  }
)

// 그룹 루틴 수정
export const modifyRoutine = createAsyncThunk(
  "routine/modify",
  async (info) => {
    const res = await http.put(`routine/${info.routineId}`, info.routine)
    console.log("그룹 루틴 수정", res.data)
    const res2 = await http.get(`routine/${res.data.data}`)
    console.log("그룹 루틴 재조회", res2)
    return res2.data
  }
)

// 그룹 루틴 삭제
export const deleteRoutine = createAsyncThunk(
  "routine/delete",
  async (routineId) => {
    const res = await http.delete(`routine/${routineId}`)
    console.log("그룹 루틴 삭제", res)
    const res2 = await http.get(`routine/${res.data.data}`)
    console.log("그룹 루틴 재조회", res2)
    return res2.data
  }
)

export const routineSlice = createSlice({
  name: "routine",
  initialState: {
    routines: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRoutine.fulfilled, (state, action) => {
      state.routines = action.payload.data
    })
    builder.addCase(createRoutine.fulfilled, (state, action) => {
      console.log(action.payload)
      state.routines = action.payload.data
    })
    builder.addCase(modifyRoutine.fulfilled, (state, action) => {
      state.routines = action.payload.data
    })
    builder.addCase(deleteRoutine.fulfilled, (state, action) => {
      state.routines = action.payload.data
    })
  },
})

export default routineSlice.reducer
