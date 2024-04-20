import { createSlice } from '@reduxjs/toolkit'

export const STATUS = {
  CHECKING: 'checking',
  NOT_AUTH: 'not-authenticated',
  AUTH: 'authenticated'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: STATUS.CHECKING,
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = STATUS.AUTH
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoURL = payload.photoURL
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = STATUS.NOT_AUTH
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = payload?.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = STATUS.CHECKING
    }
  }
})

export const { login, logout, checkingCredentials } = authSlice.actions
