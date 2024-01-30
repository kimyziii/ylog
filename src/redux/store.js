import { combineReducers, configureStore } from '@reduxjs/toolkit'
import postReducer from './slice/postSlice'
import authReducer from './slice/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
