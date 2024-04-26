import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from './journalSlice'
import { fileUpload, loadNotes } from '../../helpers'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth // obtiene el id unico del usuario que ya esta autenticado

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime()
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)) //crea una referencia a una coleccion de documentos
    await setDoc(newDoc, newNote) //guarda un documento en la base de datos usando la referencia anterior

    newNote.id = newDoc.id
    //dispatch
    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth // obtiene el id unico del usuario que ya esta autenticado
    if (!uid) throw new Error('User not exists')
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth // obtiene el id unico del usuario que ya esta autenticado

    const { active: note } = getState().journal

    const noteToFireStore = { ...note }
    delete noteToFireStore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(updateNote(note))
  }
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())

    const fileUploadPromises = []

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file)) //stored all the promises
    }

    const photoUrl = await Promise.all(fileUploadPromises)

    dispatch(setPhotosToActiveNote(photoUrl))
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const { active: note } = getState().journal

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    await deleteDoc(docRef)

    dispatch(deleteNoteById(note.id))
  }
}
