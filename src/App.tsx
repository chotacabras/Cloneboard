import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BoardForm from './components/BoardForm'
import ShowBoard from './components/ShowBoard'
import { initializeBoards } from './reducers/boardsReducer'
import { Board } from './types'
import { Switch, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBoards())
  }, [dispatch])

  const boards = useSelector<Board[], Board[]>((state) => state)

  return (
    <>
      <Link to="/">
        <div className="site">Cloneboard</div>
      </Link>
      <Switch>
        <Route path="/" exact>
          <div className="boardForm">
            <h2 className="createAndCurrentBoardsText">Create a new board</h2>
            <BoardForm />
            <h3 className="createAndCurrentBoardsText">Current boards</h3>
            {boards.map((board) => (
              <div key={board.id}>
                <Link to={`/${board.id}`}>
                  <strong className="boardsMappedText">{board.name}</strong>
                </Link>{' '}
                <br></br>
                <br></br>
              </div>
            ))}
          </div>
        </Route>
        <Route path="/:id" exact>
          <ShowBoard />
        </Route>
      </Switch>
    </>
  )
}

export default App
