import {
  authSlice,
  checkingCredentials,
  login,
  logout,
  STATUS
} from '../../../src/store/auth/authSlice'
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState
} from '../../fixtures/authFixure'

describe('test on authSlice', () => {
  test('should return initial state and be called "auth"', () => {
    expect(authSlice.name).toBe('auth')
    const state = authSlice.reducer(initialState, {})

    expect(state).toEqual(initialState)
  })

  test('should log in', () => {
    const state = authSlice.reducer(initialState, login(demoUser))
    expect(state).toEqual(authenticatedState)
  })

  test('should log out without error message', () => {
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage: null })
    )
    expect(state).toEqual(notAuthenticatedState)
  })

  test('should log out with error message', () => {
    const errorMessage = 'error message'

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    )
    expect(state).toEqual({
      status: STATUS.NOT_AUTH,
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage
    })
  })

  test('should change status to "checking"', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials())
    expect(state.status).toBe(STATUS.CHECKING)
  })
})
