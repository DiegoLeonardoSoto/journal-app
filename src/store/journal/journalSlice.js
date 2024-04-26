import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
    // active: {
    //     id:'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrl: []
    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSave = ''
    },
    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (action.payload.id === note.id) {
          return action.payload
        }
        return note
      })

      state.messageSaved = `${action.payload.title}, actualizada correctamente`
    },
    deleteNoteById: (state, action) => {}
  }
})

export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById
} = journalSlice.actions