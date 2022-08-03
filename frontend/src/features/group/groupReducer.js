import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"
import { checkMemberId } from "../myPage/myPageReducer"

// 팀 상세 정보 조회
export const teamInfo = createAsyncThunk(
  "registration/team",
  async (teamId) => {
    const res = await http.get(`registration/team/${teamId}`)
    if (res.data.message === "success") {
      return res
    }
  }
)

// 팀 누적 운동기록 조회
export const teamTotalExerciseCount = createAsyncThunk(
  "exercise/history/team/sum",
  async (teamId) => {
    const res = await http.get(`exercise/history/team/sum?teamId=${teamId}`)
    if (res.data.message === "success") return res
  }
)

// 회원의 팀 탈퇴
export const teamResign = createAsyncThunk(
  "registration/team/resign",
  async (info) => {
    const res = await http.put("registration/team/resign", info)
    if (res.data.message === "success") {
      return res
    }
  }
)
export const groupSlice = createSlice({
  name: "group",
  initialState: {
    icons: ["addIcon1", "addIcon2"],
    teamName: "teamName",
    teamContent: "teamContent",
    teamRepIcons: "basic",
    shieldCount: 0,
    teamMembers: [
      {
        repIcon: "basic",
        name: "name",
        nickname: "nickname1",
        createdAt: "2022-08-03T14:15:44.6943268",
        role: "LEADER",
      },
      {
        repIcon: "basic",
        name: "name",
        nickname: "nickname2",
        createdAt: "2022-08-03T14:15:44.6943268",
        role: "FOLLOWER",
      },
    ],
    teamLeader: {
      repIcon: "basic",
      name: "name",
      nickname: "nickname1",
      createdAt: "2022-08-03T14:15:44.6943268",
      role: "LEADER",
    },
    teamCurrentStreak: 0,
    performTeamTotals: null,
  },
  reducers: {
    sheildDown: (state, action) => {
      state.shieldCount = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(teamInfo.fulfilled, (state, action) => {
      state.icons = action.payload.data.data.icons
      state.teamName = action.payload.data.data.name
      state.teamContent = action.payload.data.data.content
      state.teamRepIcons = action.payload.data.data.repIcons
      state.shieldCount = action.payload.data.data.shieldCount
      const tmp = action.payload.data.data.members
      state.teamMembers = tmp
      state.teamLeader = tmp.find(({ role }) => role === "LEADER")
    })

    builder.addCase(teamTotalExerciseCount.fulfilled, (state, action) => {
      state.performTeamTotals = action.payload.data.data.performTeamTotals
      state.teamCurrentStreak = action.payload.data.data.currentStrick
    })
  },
})
export const { sheildDown } = groupSlice.actions
export default groupSlice.reducer
