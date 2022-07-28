import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

export const routineSlice = createSlice({
  name: "routine",
  initialState: {},
  reducers: {},
})

export default routineSlice.reducer
