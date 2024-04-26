import { SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components/ImageGallery'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo, useRef } from 'react'
import {
  setActiveNote,
  startSaveNote,
  startUploadingFiles
} from '../../store/journal'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving
  } = useSelector((state) => state.journal)
  const dispatch = useDispatch()

  const { body, title, date, onInputChange, formState } = useForm(note)

  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Note Actializada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputchange = ({ target }) => {
    if (target.files === 0) return

    dispatch(startUploadingFiles(target.files))
  }

  return (
    <Grid
      container
      className="animate__animated animate__fadeIn animate__faster"
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputchange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          color="primary"
          onClick={onSaveNote}
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      {/* Image gallery */}
      <ImageGallery />
    </Grid>
  )
}
