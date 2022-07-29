import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 회원 닉네임 변경
export const nicknameChange = createAsyncThunk(
  "mypage/nicknameChange",
  async (origin, nickname) => {
    const { data } = await http.put("/member/nickname/", {
      origin: origin,
      nickname: nickname,
    })
    return data
  }
)

// 회원 대표아이콘 설정
export const memberIconSelect = createAsyncThunk(
  "member/rep-icon",
  async (nickname, icon) => {
    const { data } = await http.put("/member/rep-icon", {
      nickname: nickname,
      icon: icon,
    })
    return data
  }
)

// 회원 IconList 조회
export const memberIconList = createAsyncThunk(
  "member/icon",
  async (memberId) => {
    const data = await http.get(`/member/icon/${memberId}`)
    return data
  }
)

// 회원 Icon 추가
export const memberIconCreate = createAsyncThunk(
  "member/icon",
  async (nickname, icon) => {
    const { data } = await http.post("/member/icon", {
      nickname: nickname,
      icon: icon,
    })
    return data
  }
)

export const myPageSlice = createSlice({
  name: "mypage",
  initialState: {
    memberOriginalIcon: "",
    memberIconList: [],
  },
  reducers: {
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

      builder.addCase(memberIconSelect.fulfilled, (state, action) => {
        state.memberOriginalIcon = action.payload["data"]
      })

      builder.addCase(memberIconList.fulfilled, (state, action) => {
        state.memberIconList = action.payload["data"]
      })

      builder.addCase(memberIconCreate.fulfilled, (state, action) => {
        state.memberIconList.push(action.payload["data"])
      })
    },
  },
})
export const { checkMemberId } = myPageSlice.actions

export default myPageSlice.reducer
