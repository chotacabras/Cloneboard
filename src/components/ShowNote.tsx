/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from 'react-redux'
import { deleteNote } from '../reducers/boardsReducer'
import { Board, List, Note } from '../types'
import { useState } from 'react'
import RenameNoteForm from './RenameNoteForm'

const ShowNote = ({
  board,
  list,
  note,
}: {
  board: Board
  list: List
  note: Note
}) => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [renameVisibleForm, setRenameVisibleForm] = useState(false)

  const deleteNoteHandler = (
    noteId: string,
    listId: string,
    boardId: string
  ) => {
    dispatch(deleteNote(noteId, listId, boardId))
  }

  const expandedMenu = { display: expanded ? '' : 'none' }
  const visibleMenu = { display: visible ? '' : 'none' }

  const renameVisibleStyle = { display: renameVisibleForm ? '' : 'none' }

  const renameNotVisibleStyle = { display: renameVisibleForm ? 'none' : '' }

  if (!note) {
    return null
  }

  return (
    <div
      className="note"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div style={renameNotVisibleStyle} className="noteHead">
        <div onClick={() => setRenameVisibleForm(true)} className="noteText">
          {note.text}
        </div>
        <div
          className="menu"
          onMouseEnter={() => {
            setExpanded(true)
            setVisible(false)
          }}
          onMouseLeave={() => {
            setExpanded(false)
            setVisible(true)
          }}
        >
          <div style={visibleMenu} className="noteMenuLogo">
            ≡
          </div>
          <div style={expandedMenu}>
            <a
              className="menuNoteDeleteButton"
              href="#"
              onClick={() => deleteNoteHandler(note.id, list.id, board.id)}
            >
              x
            </a>
          </div>
        </div>
      </div>
      <div style={renameVisibleStyle}>
        <RenameNoteForm
          note={note}
          board={board}
          list={list}
          setRenameVisibleForm={setRenameVisibleForm}
        />
      </div>
    </div>
  )
}

export default ShowNote
