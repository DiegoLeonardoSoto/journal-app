import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/auth/authSlice'
import { FirebaseAuth } from '../firebase/config'
import { startLoadingNotes } from '../store/journal'

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout()) //if there isn't a user logout
      const { uid, email, displayName, photoURL } = user
      dispatch(login({ uid, email, displayName, photoURL })) //if there is a user login
      dispatch(startLoadingNotes())
    })
  })

  return {
    status
  }
}
