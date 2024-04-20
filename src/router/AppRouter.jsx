import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { STATUS } from '../store/auth/authSlice'

export const AppRouter = () => {
  const { status } = useCheckAuth()

  if (status === STATUS.CHECKING) {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {/* With this, you can't go to the login page if you are authenticated because that page doesn't exist, the same happens in reverse */}
      {status === STATUS.AUTH ? (
        <Route path="/*" element={<JournalRoutes />} /> //if the user is authenticated only this path exists
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} /> //if the user isn't authenticated only this path exists
      )}

      {/* if there isn't user navigate to the login page */}
      <Route path="/*" element={<Navigate to={'/auth/login'} />} />
    </Routes>
  )
}
