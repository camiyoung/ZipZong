import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 팀 초대 링크 조회
export const teamInviteLink = createAsyncThunk(
  "team/invite-link",
  async (teamId) => {
    const { message, data } = await http.get(`team/invite-link/${teamId}`)
    return [message, data]
  }
)

// 팀 모든 아이콘 조회
export const teamAllIcons = createAsyncThunk("team/icons", async (teamId) => {
  const { message, data } = await http.get(`team/icons/${teamId}`)
  return [message, data]
})

// 팀 대표 아이콘 설정
export const teamRepIcon = createAsyncThunk(
  "team/rep-icon",
  async (teamId, iconName) => {
    const { message, data } = await http.put("team/rep-icon", {
      teamId: teamId,
      iconName: iconName,
    })
  }
)

// 팀 아이콘 추가
export const teamIconAdd = createAsyncThunk(
  "team/icon",
  async (teamId, iconName) => {
    const { message, data } = await http.post("team/icon", {
      teamId: teamId,
      iconName: iconName,
    })
  }
)

// 팀 정보 변경
export const teamProfileChange = createAsyncThunk(
  "team/info",
  async (teamId, name, content) => {
    const { message, data } = await http.post("team/info/", {
      teamId: teamId,
      name: name,
      content: content,
    })
    return [message, data]
  }
)

// 회원이 가입한 그룹 조회
export const memeberGroup = createAsyncThunk("team", async (memberId) => {
  const { message, data } = await http.get(`team/${memberId}`)
  return [message, data]
})

// 팀의 디테일 정보 조회
export const teamDetail = createAsyncThunk(
  "team/teamDetail",
  async (teamId) => {
    const { message, data } = await http.get(`team/${teamId}`)
    return [message, data]
  }
)

// 초기 팀 생성
// export const teamCreate = createAsyncThunk(
//   "team/create", async ()
// )

// 팀 아이디로 쉴드 하나 사용
// export const teamUseSheild = createAsyncThunk(
//   "sheild", async (teamId) => {
//     const {message, data } = await http.put(`sheild/${teamId}`)
//     return [message, data]
//   }
// )

// // 그룹 설정 정보 받기
// export const teamInfoGet = createAsyncThunk(
//   "team/info/get",
//   async ({ teamId }) => {
//     const { data } = await http.get("team/", teamId)
//     return data
//   }
// )

// export const deleteTeam = createAsyncThunk(
//   "registration/delete-team",
//   // item안에 member id, team id 있어야 함
//   async (item) => {
//     const { data } = await http.put("registration/delete-team/", item)
//     return data
//     // data에 삭제된 팀 id 있음
//   }
// )

// // 그룹원 탈퇴
// export const teamResign = createAsyncThunk(
//   "registration/team/resign",
//   // item 에 퇴출할 id, team id 필요
//   async (item) => {
//     const { data } = await http.post("registration/team/resign/", item)
//     return data
//   }
// )

// // 그룹장 강퇴
// export const expelmember = createAsyncThunk("team/expel", async (item) => {
//   const { data } = await http.post("team/expel/", memberId, teamId)
//   return data
// })

// // 그룹 위임
// export const assignLeader = createAsyncThunk(
//   "registration/team/assign",
//   // item 에 그룹장 id, 그룹원 id, 팀 id 있어야 함
//   async (item) => {
//     const { data } = await http.post("registration/team/assign/", item)
//     return data
//   }
// )

// // 그룹 정보 받기 O
// export const getGroupInfo = createAsyncThunk(
//   "registration/team",
//   // info 안에 team-id 들어감
//   async (info) => {
//     const { data } = await http.get("/registration/team/", info)
//     return data
//   }
// )

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    groupId: null,
    groupName: null,
    groupMemberCount: 0,
    groupExplanation: null,
    groupIcon: "",
  },
  reducers: {},
  extraReducers(builder) {
    // 그룹 정보 받기
    builder.addCase(getGroupInfo.fulfilled, (state, action) => {
      if (action.payload === "success") {
        state.groupId = action.payload["groupId"]
        state.groupName = action.payload["groupName"]
        state.groupMemberCount = action.payload["groupMemberCount"]
        state.groupExplanation = action.payload["groupExplanation"]
      }
    })

    // 그룹 아이콘 수정하기
    builder.addCase(teamIconChange.fulfilled, (state, action) => {
      state.groupIcon = action.payload["groupIcon"]
    })

    builder.addCase(teamInfoGet.fulfilled, (state, action) => {
      // 정보 저장할 곳을 정해야 함
    })
  },
})
