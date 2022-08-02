import { useSelector } from "react-redux"
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 개인 월 단위 운동기록 조회
export const memberExerciseHistoryCheck = createAsyncThunk(
  "exercise/history/member",
  async (info) => {
    const res = await http.get(
      `exercise/history/member?memeberId=${info.memberId}&year=${info.year}&month=${info.month}`
    )
    if (res.data.message === "success") {
      return res
    }
  }
)

// 개인 누적 운동기록 조회
export const memberExerciseHistorySumCheck = createAsyncThunk(
  "exercise/history/member/sum",
  async (memberId) => {
    const res = await http.get(
      `exercise/history/member/sum?memberId=${memberId}`
    )
    if (res.data.message === "success") {
      return res
    }
  }
)

// 회원이 가입한 팀 정보 조회
export const registrationTeam = createAsyncThunk(
  "registration/member",
  async (memberId) => {
    const res = await http.get(`registration/member/${memberId}`)
    if (res.data.message === "success") {
      return res
    }
  }
)

// 팀 생성
export const teamCreate = createAsyncThunk(
  "registration/create",
  async (info) => {
    const res = await http.post("registration/create", info)
    if (res.data.message === "success") {
      alert("팀이 생성되었습니다!")
    }
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
    memberDailyHistory: [],
    memberIconList: [],
    selectedYear: null,
    selectedMonth: null,
    memberCurrentStrick: 0,
    performMemberTotal: null,
    registeredTeam: [],
  },
  reducers: {
    checkMemberId: (state, action) => {
      state.memberId = action.payload
    },
    changeYear: (state, action) => {
      state.selectedYear = action.payload
    },
    changeMonth: (state, action) => {
      state.selectedMonth = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(memberExerciseHistoryCheck.fulfilled, (state, action) => {
      state.memberDailyHistory = action.payload.data.data.dailyHistories
    })
    builder.addCase(
      memberExerciseHistorySumCheck.fulfilled,
      (state, action) => {
        // 개인 누적 기록 - 혹시나 해서 받음
        state.performMemberTotal = action.payload.data.data.performMemberTotals
        state.memberCurrentStrick = action.payload.data.data.currentStrick
      }
    )
    builder.addCase(registrationTeam.fulfilled, (state, action) => {
      state.registeredTeam = action.payload.data.data
    })
  },
})
export const { checkMemberId, changeYear, changeMonth } = myPageSlice.actions

export default myPageSlice.reducer
