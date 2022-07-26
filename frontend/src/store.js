import { configureStore } from "@reduxjs/toolkit"
import memberReducer from "./features/login/memberReducer"

export const store = configureStore({
  reducer: {
    member: memberReducer,
  },
})
