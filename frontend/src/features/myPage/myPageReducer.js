import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

export const nicknameChange = createAsyncThunk(
  "mypage/nicknameChange",
  async (origin, nickname) => {
    const { data } = await http.get("/member/duplicate/", {
      origin,
      nickname,
    })
    return data
  }
)

export const myPageSlice = createSlice({
  name: "mypage",
  initialState: {
    memberId: null,
    memberName: null,
    memberEmail: null,
    memberProvider: null,
    memberNickname: null,
  },
  reducers: {
    // 사용 안하는 중
    checkMemberId: (state, action) => {
      state.memberId = action.payload
    },
    extraReducers(builder) {
      builder.addCase(nicknameChange.fulfilled, (state, action) => {
        if (action.payload === "success") {
          state.memberNickname = action.payload["data"]
        } else {
          console.log("닉네임 중복 처리 불가!!!")
        }
      })
    },
  },
})
export const { checkMemberId } = myPageSlice.actions

export default myPageSlice.reducer
