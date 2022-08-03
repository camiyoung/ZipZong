import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import groupReducer from "./features/group/groupReducer"
import memberReducer from "./features/login/memberReducer"
import myPageReducer from "./features/myPage/myPageReducer"
import routineReducer from "./features/routine/routineReducer"

const reducers = combineReducers({
  member: memberReducer,
  mypage: myPageReducer,
  routine: routineReducer,
  group: groupReducer,
})

// const persistConfig = {
//   key: "root",
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})
