import { configureStore } from "@reduxjs/toolkit"
import memberReducer from "./features/login/memberReducer"
import myPageReducer from "./features/myPage/myPageReducer"
export const store = configureStore({
  reducer: {
    member: memberReducer,
    mypage: myPageReducer,
  },
})
