/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { renameNote } from '../reducers/boardsReducer'
import '../styles.css'
import { Board, List, Note } from '../types'

const RenameNoteForm = ({
  note,
  board,
  list,
  setRenameVisibleForm,
}: {
  note: Note
  board: Board
  list: List
  setRenameVisibleForm: Dispatch<SetStateAction<boolean>>
}) => {
  const [newText, setNewText] = useState(note.text)
  const dispatch = useDispatch()

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (newText === '') {
      setRenameVisibleForm(false)
      setNewText(note.text)
    } else {
      dispatch(renameNote(newText, note.id, list.id, board.id))
      setRenameVisibleForm(false)
    }
  }

  return (
    <>
      <div className="noteHead">
        <div className="noteText">
          <form onSubmit={submit}>
            <div>
              <input
                className="inputCreateNoteForm"
                value={newText}
                onChange={({ target }) => setNewText(target.value)}
                placeholder="Text of the note"
              />
            </div>
          </form>
        </div>
      </div>
      <a
        className="cancelNoteRenameButton"
        href="#"
        onClick={() => {
          setRenameVisibleForm(false)
          setNewText(note.text)
        }}
      >
        cancel
      </a>
    </>
  )
}

export default RenameNoteForm
