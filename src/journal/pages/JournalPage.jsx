import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../view'
import { NothingSelectedView } from '../view/NothingSelectedView'

import { AddNoteButton } from '../components/AddNoteButton'
import { useSelector } from 'react-redux'

export const JournalPage = () => {
  const { active } = useSelector((state) => state.journal)

  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}
      <AddNoteButton />
    </JournalLayout>
  )
}
