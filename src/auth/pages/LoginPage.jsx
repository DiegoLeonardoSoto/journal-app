import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { Google } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {
  startGoogleSignIn,
  startLoginWithEmailPassword
} from '../../store/auth/thunks'
import { STATUS } from '../../store/auth/authSlice'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth)

  const { email, password, onInputChange } = useForm(formData)

  const isAuthenticating = useMemo(() => status === STATUS.CHECKING, [status])

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
    dispatch(startLoginWithEmailPassword({ email, password }))
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn')
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder="example@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder="Constraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}
            display={errorMessage ? '' : 'none'}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                type="submit"
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                aria-label="google-btn"
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
