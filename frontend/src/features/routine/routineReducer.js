import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

export const getRoutine = createAsyncThunk(
  "routine/search",
  async (groupId) => {
    console.log("그룹 루틴 조회", res.data)
    const res = await http.get(`routine/${groupId}`)
    return res.data
  }
) // 조회

export const createRoutine = createAsyncThunk("routine/", async (info) => {
  const res = await http.post(`routine/${info.groupId}`, info.routine)
  console.log("그룹 루틴 생성", res.data)
}) // 생성

export const modifyRoutine = createAsyncThunk("routine/", async (info) => {
  const res = await http.put(`routine/${info.routineId}`, info.routine)
  console.log("그룹 루틴 수정", res.data)
}) // 수정

export const deleteRoutine = createAsyncThunk("routine/", async (routineId) => {
  const res = await http.delete(`routine/${routineId}`)
  console.log("그룹 루틴 삭제", res.data)
}) // 삭제

export const routineSlice = createSlice({
  name: "routine",
  initialState: {
    routines: [
      {
        routineId: 52156,
        routineName: "슬기세트",
        exercise: [
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
        ],
        breaktime: 60,
        totaltime: 300,
      },
    ],
  },
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(getRoutine.fulfilled, (state, action) => {
    //   console.log(action.payload)
    //   // state.routines = action.payload.data
    // })
  },
})

export default routineSlice.reducer
