import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 회원 닉네임 중복 조회
export const nicknameValidation = createAsyncThunk(
  "member/duplicate",
  async (nickname) => {
    if (nickname.length > 0) {
      const { message } = await http.get(`member/duplicate/${nickname}`)
      console.log("메세지", message)
      return [message, nickname]
    } else {
      alert("닉네임을 입력해주세요")
    }
  }
)

// 회원 닉네임으로 조회
export const memberInfo = createAsyncThunk("member/info", async (nickname) => {
  const { data } = await http.get(`/member/info/${nickname}`)
  return data
})

// 회원 닉네임 설정
export const selectNickname = createAsyncThunk("member", async (nickname) => {
  const { data } = await http.get(`/member/${nickname}`)
  return data
})

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    memberId: null,
    memberName: null,
    memberEmail: null,
    memberProvider: null,
    memberNickname: null,
  },
  reducers: {
    // 로그아웃
    logout: (state, action) => {
      localStorage.clear()
    },
    // 멤버 아이디 받기
    checkMemberId: (state, action) => {
      state.memberId = action.payload
    },
  },
  extraReducers(builder) {
    //rejected, 4개의 state들이 있다고 함
    builder.addCase(nicknameValidation.fulfilled, (state, action) => {
      if (action.payload === "success") {
        state.memberNickname = action.payload[1]
      } else {
        console.log("닉네임 중복 처리 불가!!!")
      }
    })
    builder.addCase(nicknameValidation.rejected, (state, action) => {
      console.log(state, action)
    })

    builder.addCase(selectNickname.fulfilled, (state, action) => {
      state.memberName = action.payload["name"]
      state.memberEmail = action.payload["email"]
      state.memberProvider = action.payload["provider"]
      state.memberNickname = action.payload["nickname"]
    })
    builder.addCase(memberInfo.fulfilled, (state, action) => {
      state.memberName = action.payload["name"]
      state.memberEmail = action.payload["email"]
      state.memberProvider = action.payload["provider"]
      state.memberNickname = action.payload["nickname"]
    })
  },
})
export const { checkMemberId, logout } = memberSlice.actions

export default memberSlice.reducer
