/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBoard /*moveLists*/,
  moveNoteDifferentList,
  moveNoteSameList,
} from '../reducers/boardsReducer'
import { Board, List, Note } from '../types'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import RenameBoardForm from './RenameBoardForm'
import CreateListForm from './CreateListForm'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import ShowList from './ShowList'

const ShowBoard = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [expanded, setExpanded] = useState(false)
  const [visibleListForm, setVisibleListForm] = useState(false)
  const [renameVisibleForm, setRenameVisibleForm] = useState(false)

  const deleteBoardHandler = (boardId: string) => {
    dispatch(deleteBoard(boardId))
    const deletedBoard = localStorage.getItem('deletedBoard')
    if (deletedBoard === 'true') {
      history.push('/')
      localStorage.setItem('deletedBoard', JSON.stringify(null))
    }
  }

  const match = useRouteMatch<{ id: string }>('/:id')
  const boards = useSelector<Board[], Board[]>((state) => state)

  const board = match
    ? (boards.find((board) => board.id === match.params.id) as Board)
    : null

  const expandedMenu = { display: expanded ? '' : 'none' }
  const notExpandedMenu = { display: expanded ? 'none' : '' }

  const visibleListFormStyle = { display: visibleListForm ? '' : 'none' }

  const renameVisibleStyle = { display: renameVisibleForm ? '' : 'none' }

  const renameNotVisibleStyle = { display: renameVisibleForm ? 'none' : '' }

  const onDragEnd = (result: DropResult, lists: List[]) => {
    const { source, destination } = result
    if (!destination) return
    if (board) {
      if (source.droppableId !== destination.droppableId) {
        const sourceList = lists.find(
          (list) => list.id === source.droppableId
        ) as List
        const destList = lists.find(
          (list) => list.id === destination.droppableId
        ) as List
        const sourceNotes = [...sourceList.notes] as Note[]
        const destNotes = [...destList.notes] as Note[]
        const [removed] = sourceNotes.splice(source.index, 1)
        destNotes.splice(destination.index, 0, removed)
        dispatch(
          moveNoteDifferentList(
            sourceNotes,
            destNotes,
            source.droppableId,
            destination.droppableId,
            board.id
          )
        )
      } else {
        const list = lists.find(
          (list) => list.id === source.droppableId
        ) as List
        const newNotes = [...list.notes]
        const [removed] = newNotes.splice(source.index, 1)
        newNotes.splice(destination.index, 0, removed)
        dispatch(moveNoteSameList(newNotes, list.id, board.id))
      }
    }
  }

  if (!board) {
    return null
  }

  return (
    <>
      <div className="board" style={renameNotVisibleStyle}>
        <div className="head">
          <div className="text" onClick={() => setRenameVisibleForm(true)}>
            <strong>{board.name}</strong>
          </div>
          <div
            className="menu"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
          >
            <div style={notExpandedMenu} className="menuLogo">
              ≡
            </div>
            <div style={expandedMenu}>
              <a
                className="menuBoardDeleteButton"
                href="#"
                onClick={() => deleteBoardHandler(board.id)}
              >
                {' '}
                xBoard
              </a>
              <a
                className="menuListAddButton"
                href="#"
                onClick={() => setVisibleListForm(true)}
              >
                +List
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={renameVisibleStyle}>
        <RenameBoardForm
          board={board}
          setRenameVisibleForm={setRenameVisibleForm}
        />
      </div>
      <div className="lists">
        <DragDropContext onDragEnd={(result) => onDragEnd(result, board.lists)}>
          {board.lists.map((list: List) => {
            return <ShowList board={board} list={list} key={list.id} />
          })}
          <div style={visibleListFormStyle}>
            <CreateListForm
              boardId={board.id}
              setVisibleListForm={setVisibleListForm}
            />
          </div>
        </DragDropContext>
      </div>
    </>
  )
}

export default ShowBoard
