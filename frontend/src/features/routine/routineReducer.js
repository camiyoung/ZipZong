import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

export const routineSlice = createSlice({
  name: "routine",
  initialState: {
    routines: [
      {
        routineId: 0,
        routineName: "슬기세트",
        exercise: [
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
        ],
        breaktime: 60,
        totaltime: 300,
      },
      {
        routineId: 1,
        routineName: "종민세트",
        exercise: [
          { name: "BURPEE", count: 5 },
          { name: "BURPEE", count: 5 },
          { name: "BURPEE", count: 5 },
          { name: "BURPEE", count: 5 },
        ],
        breaktime: 60,
      },
      {
        routineId: 2,
        routineName: "준우세트",
        exercise: [
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
          { name: "LEGRAISE", count: 5 },
        ],
        breaktime: 60,
      },
      {
        routineId: 3,
        routineName: "승주세트",
        exercise: [
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
          { name: "PUSHUP", count: 5 },
        ],
        breaktime: 60,
      },
    ],
  },
  reducers: {
    getRoutines: (state, action) => {
      state.routines = action.payload
    },
  },
})

export default routineSlice.reducer
