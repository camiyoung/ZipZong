import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 그룹 설정 정보 받기
export const teamInfoGet = createAsyncThunk(
  "team/info/get",
  async ({ teamId }) => {
    const { data } = await http.get("team/", teamId)
    return data
  }
)
// 그룹 프로필 제목, 내용 변경
export const teamProfileChange = createAsyncThunk("team/info", async (item) => {
  // item 안에 team id, 수정한 제목, 수정한 내용 있어야 함
  const { data } = await http.post("team/info/", item)
  return data
})

// 그룹 아이콘 변경
export const teamIconChange = createAsyncThunk(
  "team/icon/change",
  // item안에 team id, 아이콘 이름 있어야 함
  async (item) => {
    const { data } = await http.post("team/icon/", item)
    return data
  }
)

export const deleteTeam = createAsyncThunk(
  "registration/delete-team",
  // item안에 member id, team id 있어야 함
  async (item) => {
    const { data } = await http.put("registration/delete-team/", item)
    return data
    // data에 삭제된 팀 id 있음
  }
)

// 그룹원 탈퇴
export const teamResign = createAsyncThunk(
  "registration/team/resign",
  // item 에 퇴출할 id, team id 필요
  async (item) => {
    const { data } = await http.post("registration/team/resign/", item)
    return data
  }
)

// 그룹장 강퇴
export const expelmember = createAsyncThunk("team/expel", async (item) => {
  const { data } = await http.post("team/expel/", memberId, teamId)
  return data
})

// 그룹 위임
export const assignLeader = createAsyncThunk(
  "registration/team/assign",
  // item 에 그룹장 id, 그룹원 id, 팀 id 있어야 함
  async (item) => {
    const { data } = await http.post("registration/team/assign/", item)
    return data
  }
)

// 그룹 정보 받기 O
export const getGroupInfo = createAsyncThunk(
  "registration/team",
  // info 안에 team-id 들어감
  async (info) => {
    const { data } = await http.get("/registration/team/", info)
    return data
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
