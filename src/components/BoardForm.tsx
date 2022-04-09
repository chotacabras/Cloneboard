import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBoard } from '../reducers/boardsReducer'
import '../styles.css'

const BoardForm = () => {
  const [board, setBoard] = useState('')
  const dispatch = useDispatch()

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (board === '') {
      setBoard('')
    } else {
      dispatch(createBoard(board))
      setBoard('')
    }
  }

  return (
    <div className="boardForm">
      <form onSubmit={submit}>
        <div>
          <input
            className="createBoard"
            value={board}
            onChange={({ target }) => setBoard(target.value)}
            placeholder="Name of the board"
          />
        </div>
      </form>
    </div>
  )
}

export default BoardForm
