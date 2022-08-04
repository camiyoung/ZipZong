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
    if (res.data.message === "success") {
      return res
    }
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

// 리더의 회원 강퇴
// leaderId, followerId, teamId 필요
export const teamExpel = createAsyncThunk(
  "registration/team/expel",
  async (info) => {
    const res = await http.put("registration/team/expel", info)
    if (res.data.message === "success") {
      return res
    }
  }
)

// 리더의 그룹장 위임
// leaderId, followerId, teamId 필요
export const teamAssign = createAsyncThunk(
  "registration/team/assign",
  async (info) => {
    const res = await http.put("registration/team/assign", info)
    if (res.data.message === "success") {
      return res
    }
  }
)

// 팀 대표 아이콘 설정
export const teamRepIconModify = createAsyncThunk(
  "team/rep-icon",
  async (info) => {
    const res = await http.put("team/rep-icon", info)
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
      const res2 = await http.get(`registration/member/${info.memberId}`)
      if (res2.data.message === "success") {
        return res2
      }
      console.log("팀이 생성되었습니다.")
    }
  }
)

// 팀 삭제
export const teamDelete = createAsyncThunk(
  "registration/delete-team",
  async (info) => {
    const res = await http.put("registration/delete-team", info)
    if (res.data.message === "success") {
      const res2 = await http.get(`registration/member/${info.memberId}`)
      if (res2.data.message === "success") {
        return res2
      }
    }
  }
)

// 팀 초대 링크 조회
export const teamInviteLink = createAsyncThunk(
  "team/invite-link",
  async (teamId) => {
    const res = await http.get(`team/invite-link/${teamId}`)
    if (res.data.message === "success") {
      return res
    }
  }
)

// 팀 초대링크로 팀 아이디 조회
export const teamLinkLookup = createAsyncThunk(
  "team/link",
  async (inviteLink) => {
    const res = await http.get(`team/${inviteLink}`)
    if ((res.data.message = "success")) {
      const teamIdByLink = res.data.data
      const res2 = await http.get(`registration/team/${teamIdByLink}`)

      if (res2.data.message === "success") {
        return res2
      }
    }
  }
)

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    registeredTeam: [],
    inviteLink: "",
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

    builder.addCase(teamRepIconModify.fulfilled, (state, action) => {
      state.teamRepIcons = action.payload.data.data
    })

    builder.addCase(teamInviteLink.fulfilled, (state, action) => {
      state.inviteLink = action.payload.data.data
    })

    builder.addCase(teamLinkLookup.fulfilled, (state, action) => {
      state.icons = action.payload.data.data.icons
      state.teamName = action.payload.data.data.name
      state.teamContent = action.payload.data.data.content
      state.teamRepIcons = action.payload.data.data.repIcons
      state.shieldCount = action.payload.data.data.shieldCount
      const tmp = action.payload.data.data.members
      state.teamMembers = tmp
      state.teamLeader = tmp.find(({ role }) => role === "LEADER")
    })

    builder.addCase(teamCreate.fulfilled, (state, action) => {
      console.log("생성", action)
      state.registeredTeam = action.payload.data.data
    })

    builder.addCase(teamDelete.fulfilled, (state, action) => {
      console.log("삭제", action)
      state.registeredTeam = action.payload.data.data
    })

    builder.addCase(registrationTeam.fulfilled, (state, action) => {
      state.registeredTeam = action.payload.data.data
    })
  },
})
export const { sheildDown } = groupSlice.actions
export default groupSlice.reducer
