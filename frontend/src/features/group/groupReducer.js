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

// 그룹 아이콘 변경
export const teamIconChange = createAsyncThunk(
  "team/icon/change",
  async (item) => {
    const { data } = await http.post("team/icon/", item)
    return data
  }
)

// 그룹장 강퇴
export const expelmember = createAsyncThunk("team/expel", async (item) => {
  const { data } = await http.post("team/expel/", memberId, teamId)
  return data
})

// 그룹 위임
export const assignLeader = createAsyncThunk("team/assign", async (item) => {
  const { data } = await http.post(
    "/team/assign/",
    groupLeaderId,
    groupmemberId,
    teamId
  )
  return data
})

// 그룹 정보 받기
export const getGroupInfo = createAsyncThunk("group/info", async (info) => {
  const { data } = await http.get("/group/", info.groupId)
  return data
})

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
