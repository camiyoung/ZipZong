import { configureStore } from "@reduxjs/toolkit"
import memberReducer from "./features/login/memberReducer"
import myPageReducer from "./features/myPage/myPageReducer"
import routineReducer from "./features/routine/routineReducer"

export const store = configureStore({
  reducer: {
    member: memberReducer,
    mypage: myPageReducer,
    routine: routineReducer,
  },
})
