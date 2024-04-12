import { JournalLayout } from '../layout/JournalLayout'
//import { NoteView } from '../view'
import { NothingSelectedView } from '../view/NothingSelectedView'

import { AddNoteButton } from '../components/AddNoteButton'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/*<NoteView />*/}
      <NothingSelectedView />

      <AddNoteButton />
    </JournalLayout>
  )
}
