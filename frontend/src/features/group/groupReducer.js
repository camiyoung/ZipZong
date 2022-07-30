import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 팀 생성
export const teamCreate = createAsyncThunk(
  "registration/create",
  async (info) => {
    const res = await http.post("registration/create", info)
    console.log("teamCreate", res)
  }
)

// 팀 삭제
export const teamDelete = createAsyncThunk(
  "registration/delete-team",
  async (info) => {
    const res = await http.put("registration/delete-team", info)
    console.log("teamDelete", res)
  }
)

// 팀 상세 정보 조회
export const teamInfoLookUp = createAsyncThunk(
  "registration/team",
  async (teamId) => {
    const res = await http.get(`registration/team/${teamId}`)
    console.log("팀 상세 정보 조회", res)
  }
)

// 회원이 가입한 팀 정보 조회
export const memberTeamInfoLookUp = createAsyncThunk(
  "registration/member",
  async (memberId) => {
    const res = await http.get(`registration/member/${memberId}`)
    console.log("회원이 가입한 팀 정보 조회", res)
  }
)

// 회원의 팀 탈퇴
export const memeberResign = createAsyncThunk(
  "registration/team/resign",
  async (info) => {
    const res = await http.put("registration/team/resign", info)
    console.log("회원의 팀 탈퇴", res)
  }
)

// 리더의 회원 강퇴
export const memberLeaderResign = createAsyncThunk(
  "registration/team/expel",
  async (info) => {
    const res = await http.put("registration/team/expel", info)
    console.log("리더의 회원 강퇴", res)
  }
)

// 리더의 그룹장 위임
export const memberLeaderAssign = createAsyncThunk(
  "registration/team/assign",
  async (info) => {
    const res = await http.put("registration/team/assign", info)
    console.log("리더의 그룹장 위임", res)
  }
)
////////////////////////////////////////////////////////////////////
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
})
