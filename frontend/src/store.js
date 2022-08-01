import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import memberReducer from "./features/login/memberReducer"
import myPageReducer from "./features/myPage/myPageReducer"
import routineReducer from "./features/routine/routineReducer"
import thunk from "redux-thunk"

const reducers = combineReducers({
  member: memberReducer,
  mypage: myPageReducer,
  routine: routineReducer,
})

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
})
