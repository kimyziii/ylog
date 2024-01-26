const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN: (state) => {
      state.isLoggedIn = true
    },
    SET_LOGOUT: (state) => {
      state.isLoggedIn = false
    },
  },
})

export const { SET_LOGIN, SET_LOGOUT } = authSlice.actions

export const selectLoggedIn = (state) => state.auth.isLoggedIn

export default authSlice.reducer
