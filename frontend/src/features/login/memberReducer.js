import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"
import { useDispatch } from "react-redux"

// 회원 닉네임 중복 조회
export const nicknameValidation = createAsyncThunk(
  "member/duplicate",
  async (nickname) => {
    if (nickname.length > 0) {
      const res = await http.get(`member/duplicate/${nickname}`)
      if (res.data.data === "NON-DUPLICATE") {
        return true
      } else if (res.data.data === "DUPLICATE") {
        return false
      }
    } else {
      alert("닉네임을 입력해주세요")
    }
  }
)

// 회원 닉네임 설정
export const nicknamePush = createAsyncThunk(
  "member/nickname",
  async (info) => {
    const res = await http.post("member/nickname", info)
    return res
  }
)

// 회원 닉네임으로 조회
export const memberInfo = createAsyncThunk("member/info/", async (nickname) => {
  console.log(nickname)
  const res = await http.get(`member/info/${nickname}`)
  console.log("res", res)
  return res
})

// 회원 닉네임 변경
export const nicknameChange = createAsyncThunk(
  "member/nicknameChange",
  async (info) => {
    console.log("닉네임 변경", info)
    const res = await http.put("member/nickname", {
      origin: info.origin,
      nickname: info.nickname,
    })
    if (res.data.message === "success") {
      return res
    } else {
      // 닉네임 중복 처리
      alert("닉네임이 중복되었습니다.")
    }
  }
)

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    memberId: null,
    memberName: null,
    memberEmail: null,
    memberProvider: null,
    memberNickname: null,
    memberRepIcon: null,
  },
  reducers: {
    // 로그아웃
    logout: (state, action) => {
      localStorage.clear()
    },
    // 멤버 아이디 받기
    checkMemberId: (state, action) => {
      state.memberId = Number(action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(memberInfo.fulfilled, (state, action) => {
      console.log("멤버인포빌더", action)
      // state.memberName = action.payload["name"]
      // state.memberEmail = action.payload["email"]
      // state.memberProvider = action.payload["provider"]
      // state.memberNickname = action.payload["nickname"]
    })
    builder.addCase(nicknamePush.fulfilled, (state, action) => {
      state.memberName = action.payload.data.data.name
      state.memberEmail = action.payload.data.data.email
      state.memberNickname = action.payload.data.data.nickname
      state.memberProvider = action.payload.data.data.provider
      state.memberRepIcon = action.payload.data.data.repIcon
    })
    builder.addCase(nicknameChange.fulfilled, (state, action) => {
      console.log(state)
      state.memberNickname = action.payload.data.data
    })
  },
})
export const { checkMemberId, logout } = memberSlice.actions

export default memberSlice.reducer
