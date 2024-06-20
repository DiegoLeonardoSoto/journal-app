import { STATUS } from '../../src/store/auth/authSlice'

export const initialState = {
  status: STATUS.CHECKING,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}
export const demoUser = {
  uid: '1213ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg'
}

export const authenticatedState = {
  status: STATUS.AUTH,
  uid: demoUser.uid,
  email: demoUser.email,
  displayName: demoUser.displayName,
  photoURL: demoUser.photoURL,
  errorMessage: null
}

export const notAuthenticatedState = {
  status: STATUS.NOT_AUTH,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}
