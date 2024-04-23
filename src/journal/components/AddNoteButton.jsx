import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'

export const AddNoteButton = () => {
  const { isSaving } = useSelector((state) => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <IconButton
      disabled={isSaving}
      onClick={onClickNewNote}
      size="large"
      sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        position: 'fixed',
        right: 50,
        bottom: 50
      }}
    >
      <AddOutlined sx={{ fontSize: 30 }} />
    </IconButton>
  )
}
