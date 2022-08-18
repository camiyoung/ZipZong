import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"
import { checkMemberId } from "../myPage/myPageReducer"
import axios from "axios"

// 팀 상세 정보 조회
export const teamInfo = createAsyncThunk(
  "registration/team",
  async (teamId) => {
    const res = await http.get(`registration/team/${teamId}`)
    if (res.data.message === "success") {
      // 팀 초대 링크 조회
      const res2 = await http.get(`team/invite-link/${teamId}`)

      // 오늘 운동한 멤버리스트 조회
      const res3 = await http.get(`exercise/today/team?teamId=${teamId}`)
      return [res.data, res2.data, res3.data]
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
      const res2 = await http.get(`registration/team/${info.teamId}`)
      if (res2.data.message === "success") {
        return res2
      }
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

// 팀 모든 아이콘 조회
export const teamAllIcons = createAsyncThunk("team/icons", async (teamId) => {
  const res = await http.get(`team/icons/${teamId}`)
  if (res.data.message === "success") {
    return res
  }
})

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
    }
  }
)

// export const teamDuplicateCheck = createAsyncThunk(
//   "team/duplicate", async (info) => {
//     const
//   }
// )

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

// 팀 초대링크로 팀 아이디 조회
// 여기는 axios 막으면 안됨
export const teamLinkLookup = createAsyncThunk(
  "team/link",
  async (inviteLink) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}team/${inviteLink}`
    )
    if ((res.data.message = "success")) {
      const teamIdByLink = res.data.data
      const res2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}registration/team/${teamIdByLink}`
      )

      if (res2.data.message === "success") {
        return [res.data, res2.data]
      }
    }
  }
)

// 팀 가입
export const teamJoin = createAsyncThunk("registration/join", async (info) => {
  const res = await http.post("registration/join", info)
  if (res.data.message === "success") {
    const res2 = await http.get(`registration/member/${info.memberId}`)
    if (res2.data.message === "success") {
      return res2
    }
  }
})

// 팀 월 단위 운동기록 조회
export const teamMonthHistoryCheck = createAsyncThunk(
  "exercise/history/team",
  async (info) => {
    const res = await http.get(
      `exercise/history/team?teamId=${info.teamId}&year=${info.year}&month=${info.month}`
    )
    if (res.data.message === "success") {
      return res
    }
  }
)

// 팀 순위 정보 조회
export const rankingTeam = createAsyncThunk("ranking/team", async (teamId) => {
  const res = await http.get(`ranking/team/${teamId}`)
  if (res.data.message === "success") {
    return res
  }
})

// 팀 정보 변경
export const teamInfoModify = createAsyncThunk("team/info", async (info) => {
  const res = await http.put("team/info", info)
  if (res.data.message === "success") {
    return res
  }
})

// 방 정보 가져오기
export const roomInfoGet = createAsyncThunk("room/get", async (teamId) => {
  const res = await http.get(`room/${teamId}`)
  if (res.data.message === "success") {
    return res
  }
})

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    stateGroupDailyHistory: [],
    timeRank: [],
    strickRank: [],
    teamDailyHistory: [],
    inviteTeamId: null,
    registeredTeam: [],
    inviteLink: null,
    icons: [],
    basicIcons: [
      "deer",
      "bee",
      "elephant",
      "ferret",
      "frog",
      "pandaBear",
      "pig",
      "rabbit",
      "walrus",
      "yak",
      "cougar",
      "crab",
      "fish",
      "octopus",
      "squirrel",
      "turtle",
      "whale",
      "shrimp",
    ],
    basicTeamIcons: ["basic", "person2", "person3", "person4"],
    teamName: null,
    teamContent: null,
    teamRepIcons: "basic",
    shieldCount: 0,
    teamMembers: [],
    teamLeader: null,
    teamCurrentStreak: 0,
    performTeamTotals: null,
    roomStatus: "",
    roomParticipant: [],
    roomName: "",
  },
  reducers: {
    inviteTeamIdConfirm: (state, action) => {
      state.inviteTeamId = action.payload
    },
    setTeamDailyHistory: (state, action) => {
      state.stateGroupDailyHistory = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(teamInfo.fulfilled, (state, action) => {
      state.icons = action.payload[0].data.icons
      state.teamName = action.payload[0].data.name
      state.teamContent = action.payload[0].data.content
      state.teamRepIcons = action.payload[0].data.repIcons
      state.shieldCount = action.payload[0].data.shieldCount

      const niceMembers = action.payload[2].data.niceMembers
      const tmp = action.payload[0].data.members
      const exerciseStatus = {
        hasExercised: false,
      }

      for (let x = 0; x < tmp.length; ++x) {
        Object.assign(tmp[x], exerciseStatus)
      }

      niceMembers.forEach(({ nickName }) => {
        for (let i = 0; i < tmp.length; ++i) {
          if (nickName === tmp[i].nickname) {
            tmp[i].hasExercised = true
          }
        }
      })
      state.teamMembers = tmp
      state.teamLeader = tmp.find(({ role }) => role === "LEADER")

      // 초대 링크 변경
      state.inviteLink = action.payload[1].data
    })

    builder.addCase(teamTotalExerciseCount.fulfilled, (state, action) => {
      state.performTeamTotals = action.payload.data.data.performTeamTotals
      state.teamCurrentStreak = action.payload.data.data.currentStrick
    })

    builder.addCase(teamRepIconModify.fulfilled, (state, action) => {
      state.teamRepIcons = action.payload.data.data
    })

    builder.addCase(teamLinkLookup.fulfilled, (state, action) => {
      state.icons = action.payload[1].data.icons
      state.teamName = action.payload[1].data.name
      state.teamContent = action.payload[1].data.content
      state.teamRepIcons = action.payload[1].data.repIcons
      state.shieldCount = action.payload[1].data.shieldCount
      const tmp = action.payload[1].data.members
      state.teamMembers = tmp
      state.teamLeader = tmp.find(({ role }) => role === "LEADER")

      state.inviteTeamId = action.payload[0].data
    })

    builder.addCase(teamCreate.fulfilled, (state, action) => {
      state.registeredTeam = action.payload.data.data
    })

    builder.addCase(teamDelete.fulfilled, (state, action) => {
      state.registeredTeam = action.payload.data.data
    })

    builder.addCase(registrationTeam.fulfilled, (state, action) => {
      state.registeredTeam = action.payload.data.data
    })

    builder.addCase(teamJoin.fulfilled, (state, action) => {
      state.registeredTeam = action.payload.data.data
    })

    builder.addCase(teamMonthHistoryCheck.fulfilled, (state, action) => {
      state.teamDailyHistory = action.payload.data.data.dailyHistories
    })

    builder.addCase(rankingTeam.fulfilled, (state, action) => {
      state.strickRank = action.payload.data.data.strickRank
      state.timeRank = action.payload.data.data.timeRank
    })

    builder.addCase(teamAllIcons.fulfilled, (state, action) => {
      state.icons = action.payload.data.data
    })

    builder.addCase(teamInfoModify.fulfilled, (state, action) => {
      state.teamContent = action.payload.data.data.content
      state.teamName = action.payload.data.data.name
    })

    builder.addCase(teamExpel.fulfilled, (state, action) => {
      state.icons = action.payload.data.data.icons
      state.teamName = action.payload.data.data.name
      state.teamContent = action.payload.data.data.content
      state.teamRepIcons = action.payload.data.data.repIcons
      state.shieldCount = action.payload.data.data.shieldCount
      state.teamMembers = action.payload.data.data.members
    })

    builder.addCase(roomInfoGet.fulfilled, (state, action) => {
      state.roomStatus = action.payload.data.data.status
      state.roomParticipant = action.payload.data.data.participant
      state.roomName = action.payload.data.data.name
    })
  },
})
export const { inviteTeamIdConfirm, setTeamDailyHistory } = groupSlice.actions
export default groupSlice.reducer
