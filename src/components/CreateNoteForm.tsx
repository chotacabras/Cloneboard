/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/boardsReducer'

const NoteForm = ({
  listId,
  boardId,
  setVisibleNoteForm,
}: {
  listId: string
  boardId: string
  setVisibleNoteForm: Dispatch<SetStateAction<boolean>>
}) => {
  const [note, setNote] = useState('')
  const dispatch = useDispatch()

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (note === '') {
      setNote('')
    } else {
      dispatch(createNote(note, listId, boardId))
      setVisibleNoteForm(false)
      setNote('')
    }
  }

  return (
    <>
      <div className="note">
        <div className="noteHead">
          <div className="noteText">
            <form onSubmit={submit}>
              <div>
                <input
                  className="inputCreateNoteForm"
                  value={note}
                  onChange={({ target }) => setNote(target.value)}
                  placeholder="Text of the note"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <a
        className="cancelNoteRenameButton"
        href="#"
        onClick={() => {
          setVisibleNoteForm(false)
          setNote('')
        }}
      >
        cancel
      </a>
    </>
  )
}

export default NoteForm
