import { useSelector } from "react-redux"
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 개인 월 단위 운동기록 조회
export const memberExerciseHistoryCheck = createAsyncThunk(
  "exercise/history/member",
  async (info) => {
    const res = await http.get(
      `exercise/history/member?memberId=${info.memberId}&year=${info.year}&month=${info.month}`
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

// 회원 아이콘리스트 조회
export const memberIconListReview = createAsyncThunk(
  "member/icon",
  async (memberId) => {
    const res = await http.get(`member/icon/${memberId}`)
    if (res.data.message === "success") {
      return res
    }
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
    memberTotalTime: null,
    showYear: null,
    showMonth: null,
    showDay: null,
    stateDailyHistory: null,
  },
  reducers: {
    changeYear: (state, action) => {
      state.selectedYear = action.payload
    },
    changeMonth: (state, action) => {
      state.selectedMonth = action.payload
    },
    showYearChange: (state, action) => {
      state.showYear = action.payload
    },
    showMonthChange: (state, action) => {
      state.showMonth = action.payload
    },
    showDayChange: (state, action) => {
      state.showDay = action.payload
    },
    setDailyHistory: (state, action) => {
      state.stateDailyHistory = action.payload
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
        state.memberTotalTime = action.payload.data.data.totalTime
      }
    )

    builder.addCase(memberIconListReview.fulfilled, (state, action) => {
      state.memberIconList = action.payload.data.data
    })
  },
})
export const {
  changeYear,
  changeMonth,
  showYearChange,
  showMonthChange,
  showDayChange,
  setDailyHistory,
} = myPageSlice.actions

export default myPageSlice.reducer
