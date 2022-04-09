/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { renameBoard } from '../reducers/boardsReducer'
import '../styles.css'
import { Board } from '../types'

const RenameBoardForm = ({
  board,
  setRenameVisibleForm,
}: {
  board: Board
  setRenameVisibleForm: Dispatch<SetStateAction<boolean>>
}) => {
  const [newName, setNewName] = useState(board.name)
  const dispatch = useDispatch()

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (newName === '') {
      setRenameVisibleForm(false)
      setNewName(board.name)
    } else {
      dispatch(renameBoard(newName, board.id))
      setRenameVisibleForm(false)
    }
  }

  return (
    <>
      <div className="board">
        <div className="head">
          <div className="text">
            <form onSubmit={submit}>
              <div>
                <input
                  className="inputCreateListForm"
                  value={newName}
                  onChange={({ target }) => setNewName(target.value)}
                  placeholder="Name of the board"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <a
        className="cancelBoardRenameButton"
        href="#"
        onClick={() => {
          setRenameVisibleForm(false)
          setNewName(board.name)
        }}
      >
        cancel
      </a>
    </>
  )
}

export default RenameBoardForm
