import { combineReducers, configureStore } from '@reduxjs/toolkit'
import postReducer from './slice/postSlice'
import authReducer from './slice/authSlice'

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
