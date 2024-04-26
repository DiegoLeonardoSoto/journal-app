import { TurnedInNot } from '@mui/icons-material'
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

// eslint-disable-next-line react/prop-types
export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch()

  const newTitlte = useMemo(() => {
    // eslint-disable-next-line react/prop-types
    return title.length > 17 ? title.substring(0, 17) + '...' : title
  }, [title])

  const newBody = useMemo(() => {
    // eslint-disable-next-line react/prop-types
    return body.length > 10 ? body.substring(0, 10) + '...' : body
  }, [body])

  const handleActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }))
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText sx={{ fontWeight: 800 }} primary={newTitlte} />
          <ListItemText sx={{ color: 'GrayText' }} primary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
