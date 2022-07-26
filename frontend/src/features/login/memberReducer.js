import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  memberId: null,
  memberName: null,
  memberEmail: null,
  memberProvider: null,
  memberNickname: null,
}

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    checkMemberId: (state, action) => {
      state.value = action.payload
    },
    checkMemberName: (state, action) => {
      state.value = action.payload
    },
    checkMemberEmail: (state, action) => {
      state.value = action.payload
    },
    checkMemberProvider: (state, action) => {
      state.value = action.payload
    },
    checkMemberNickname: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {
  checkMemberId,
  checkMemberName,
  checkMemberEmail,
  checkMemberProvider,
  checkMemberNickname,
} = memberSlice.actions

export default memberSlice.reducer
