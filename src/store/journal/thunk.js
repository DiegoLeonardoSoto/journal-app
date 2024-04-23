import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth // obtiene el id unico del usuario que ya esta autenticado

    const newNote = {
      title: '',
      body: '',
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
