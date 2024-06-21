import { startNewNote } from '../../../src/store/journal'

describe('test on Journal Thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('startNewNote should create a new note', async () => {
    const uid = 'TEST-UID'
    getState.mockReturnValue({ auth: { uid: uid } }) //return value as a mock

    await startNewNote()(dispatch, getState)
  })
})
