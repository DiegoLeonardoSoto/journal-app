import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle
} from '../../../src/firebase/providers'
import {
  checkingCredentials,
  login,
  logout
} from '../../../src/store/auth/authSlice'
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout
} from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal'
import { demoUser } from '../../fixtures/authFixture'

jest.mock('../../../src/firebase/providers')

describe('test on Auth thunks', () => {
  const dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should invoke checkingCredentials', async () => {
    await checkingAuthentication()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn should call checkingCredentials and login - success', async () => {
    const loginData = { ok: true, ...demoUser }

    await signInWithGoogle.mockResolvedValue(loginData)

    //thunk
    await startGoogleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startGoogleSignIn should call checkingCredentials and logout - failed', async () => {
    const loginData = { ok: false, errorMessage: 'error message' }

    await signInWithGoogle.mockResolvedValue(loginData)

    //thunk
    await startGoogleSignIn()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startLoginWithEmailPassword should call checkingCredentials and login - success', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    //thunk
    await startLoginWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startLoginWithEmailPassword should call checkingCredentials and logout - failed', async () => {
    const loginData = { ok: false, errorMessage: 'error message' }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    //thunk
    await startLoginWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startCreatingUserWithEmailPassword should call login - success', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = {
      password: '123456',
      email: demoUser.email,
      displayName: demoUser.displayName
    }

    await registerUserWithEmailPassword.mockResolvedValue(loginData)

    //thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startCreatingUserWithEmailPassword should call logout - failed', async () => {
    const loginData = { ok: false, errorMessage: 'error message' }
    const formData = {
      password: '',
      email: '',
      displayName: ''
    }

    await registerUserWithEmailPassword.mockResolvedValue(loginData)

    //thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startLogout should call logoutFirebase, clearNotes and logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
