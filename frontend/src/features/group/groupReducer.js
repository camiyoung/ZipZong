import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"

// 그룹 설정 정보 받기

// 그룹 프로필 제목, 내용 변경

// 그룹 아이콘 변경
export const teamIconChange = createAsyncThunk(
  "team/icon/change",
  async (teamId, groupIcon) => {
    const { data } = await http.post("team/icon/", teamId, groupIcon)
    return data
  }
)

// 그룹장 강퇴
export const expelmember = createAsyncThunk(
  "team/expel",
  async (memberId, teamId) => {
    const { data } = await http.post("team/expel/", memberId, teamId)
    return data
  }
)

// 그룹 위임
export const assignLeader = createAsyncThunk(
  "team/assign",
  async (groupLeaderId, groupmemberId, teamId) => {
    const { data } = await http.post(
      "/team/assign/",
      groupLeaderId,
      groupmemberId,
      teamId
    )
    return data
  }
)

// 그룹 정보 받기
export const getGroupInfo = createAsyncThunk("group/info", async (info) => {
  const { data } = await http.get("/group/", info.groupId)
  return data
})

// 그룹장인지 여부 확인
export const checkGroupLeader = createAsyncThunk(
  "group/leader",
  async (groupId, memberId) => {
    const { data } = await http.get("/group/leader/", groupId, memberId)
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

    // 그룹장인지 여부 확인
    builder.addCase(checkGroupLeader.fulfilled, (state, action) => {
      if (action.payload === "true") {
        return true
      }
    })

    builder.addCase(teamIconChange.fulfilled, (state, action) => {
      state.groupIcon = action.payload["groupIcon"]
    })
  },
})
