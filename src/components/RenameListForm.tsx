/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { renameList } from '../reducers/boardsReducer'
import '../styles.css'
import { Board, List } from '../types'

const RenameListForm = ({
  board,
  list,
  setRenameVisibleForm,
}: {
  board: Board
  list: List
  setRenameVisibleForm: Dispatch<SetStateAction<boolean>>
}) => {
  const [newName, setNewName] = useState(list.name)
  const dispatch = useDispatch()

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (newName === '') {
      setRenameVisibleForm(false)
      setNewName(list.name)
    } else {
      dispatch(renameList(newName, list.id, board.id))
      setRenameVisibleForm(false)
    }
  }

  return (
    <>
      <div className="head">
        <div className="text">
          <form onSubmit={submit}>
            <div>
              <input
                className="inputCreateListForm"
                value={newName}
                onChange={({ target }) => setNewName(target.value)}
                placeholder="Name of the list"
              />
            </div>
          </form>
        </div>
      </div>
      <a
        className="cancelListRenameButton"
        href="#"
        onClick={() => {
          setRenameVisibleForm(false)
          setNewName(list.name)
        }}
      >
        cancel
      </a>
    </>
  )
}

export default RenameListForm
