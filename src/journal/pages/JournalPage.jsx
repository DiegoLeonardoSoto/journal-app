import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../view'
//import { NothingSelectedView } from '../view/NothingSelectedView'

export const JournalPage = () => {
  return (
    <JournalLayout>
      <NoteView />
    </JournalLayout>
  )
}
