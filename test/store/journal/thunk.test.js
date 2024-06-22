import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  startNewNote
} from '../../../src/store/journal'
import { FirebaseDB } from '../../../src/firebase/config'

describe('test on Journal Thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('startNewNote should create a new note', async () => {
    const uid = 'TEST-UID'
    getState.mockReturnValue({ auth: { uid: uid } }) //return value as a mock

    await startNewNote()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(savingNewNote())
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: '',
        title: '',
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: []
      })
    )

    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        date: expect.any(Number),
        id: expect.any(String),
        imageUrls: []
      })
    )

    //delete from firebase

    //1) get collection reference
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)

    //2) get all docs
    const docs = await getDocs(collectionRef)

    //3) create promises's array
    const deletePromises = []

    //4) for each doc, generate a promise to delete it
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)))

    //5) call all promises from the array
    await Promise.all(deletePromises)
  }, 10000)
})
