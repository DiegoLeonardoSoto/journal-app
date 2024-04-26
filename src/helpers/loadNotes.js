import { collection, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('User not exists')

  const colecctionRef = collection(FirebaseDB, `${uid}/journal/notes`) // get a reference to a collection

  const docs = await getDocs(colecctionRef) //get all colections

  const notes = []
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() })
  })
  return notes
}
