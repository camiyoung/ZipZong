import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"
import { useDispatch } from "react-redux"

// 회원 닉네임 중복 조회
export const nicknameValidation = createAsyncThunk(
  "member/duplicate",
  async (nickname) => {
    if (nickname.length > 0) {
      const res = await http.get(`member/duplicate/${nickname}`)
      return [res.data.data, nickname]
    } else {
      alert("닉네임을 입력해주세요")
    }
  }
)

// 회원 닉네임으로 조회
export const memberInfo = createAsyncThunk("member/info/", async (nickname) => {
  console.log("닉네임", nickname)
  const res = await http.get(`member/info/${nickname}`)
  console.log("회원 닉네임으로 조회", res)
  // return res.data.data
})

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
      state.memberId = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(nicknameValidation.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload[0] === "NON-DUPLICATE") {
        state.memberNickname = action.payload[1]
        console.log(state.memberId, state.memberNickname)
        // 회원 닉네임 설정
        http
          .post("member/nickname", {
            memberId: state.memberId,
            nickname: state.memberNickname,
          })
          .then((res) => {
            if (res.message === "success") {
              state.memberName = res.data.name
              state.memberEmail = res.data.email
              state.memberProvider = res.data.provider
              state.memberNickname = res.data.nickname
              state.memberRepIcon = res.data.repIcon
            }
          })
      }
    })
    builder.addCase(memberInfo.fulfilled, (state, action) => {
      console.log("멤버인포빌더", action)
      // state.memberName = action.payload["name"]
      // state.memberEmail = action.payload["email"]
      // state.memberProvider = action.payload["provider"]
      // state.memberNickname = action.payload["nickname"]
    })
  },
})
export const { checkMemberId, logout } = memberSlice.actions

export default memberSlice.reducer
