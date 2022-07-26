import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  memberId: null,
}

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    checkMemberId: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { checkMemberId } = memberSlice.actions

export default memberSlice.reducer
