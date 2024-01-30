import { combineReducers, configureStore } from '@reduxjs/toolkit'
import postReducer from './slice/postSlice'
import authReducer from './slice/authSlice'
import { persistReducer, persistStore } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

export type RootReducer = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
})

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const persistedReducer = persistReducer<RootReducer>(
  {
    key: 'root',
    storage,
  },
  rootReducer,
)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
export let persistor = persistStore(store)
