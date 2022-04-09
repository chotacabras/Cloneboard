/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from 'react-redux'
import {
  deleteList,
  moveListLeft,
  moveListRight,
} from '../reducers/boardsReducer'
import { Board, List, Note } from '../types'
import { useState } from 'react'
import RenameListForm from './RenameListForm'
import CreateNoteForm from './CreateNoteForm'
import ShowNote from './ShowNote'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const ShowList = ({ board, list }: { list: List; board: Board }) => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)
  const [renameVisibleForm, setRenameVisibleForm] = useState(false)
  const [visibleNoteForm, setVisibleNoteForm] = useState(false)

  const deleteListHandler = (listId: string, boardId: string) => {
    dispatch(deleteList(listId, boardId))
  }

  const moveListLeftHandler = (listId: string, boardId: string) => {
    dispatch(moveListLeft(listId, boardId))
  }

  const moveListRightHandler = (listId: string, boardId: string) => {
    dispatch(moveListRight(listId, boardId))
  }

  const expandedMenu = { display: expanded ? '' : 'none' }
  const notExpandedMenu = { display: expanded ? 'none' : '' }

  const renameVisibleStyle = { display: renameVisibleForm ? '' : 'none' }

  const renameNotVisibleStyle = { display: renameVisibleForm ? 'none' : '' }

  const visibleNoteFormStyle = { display: visibleNoteForm ? '' : 'none' }

  if (!list) {
    return null
  }

  return (
    <div className="list">
      <div style={renameNotVisibleStyle} className="head">
        <div className="text" onClick={() => setRenameVisibleForm(true)}>
          <strong>{list.name}</strong>
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
              className="menuListDeleteButton"
              href="#"
              onClick={() => deleteListHandler(list.id, board.id)}
            >
              xList
            </a>
            <a
              className="menuListMoveLeftButton"
              href="#"
              onClick={() => moveListLeftHandler(list.id, board.id)}
            >
              {'<'}Mo
            </a>
            <a
              className="menuListMoveRightButton"
              href="#"
              onClick={() => moveListRightHandler(list.id, board.id)}
            >
              ve{'>'}
            </a>
            <a
              className="menuNoteAddButton"
              href="#"
              onClick={() => setVisibleNoteForm(true)}
            >
              +Note
            </a>
          </div>
        </div>
      </div>
      <div style={renameVisibleStyle}>
        <RenameListForm
          board={board}
          list={list}
          setRenameVisibleForm={setRenameVisibleForm}
        />
      </div>
      <Droppable droppableId={list.id}>
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.notes.map((note: Note, index) => {
                return (
                  <Draggable key={note.id} draggableId={note.id} index={index}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style }}
                        >
                          <ShowNote
                            key={note.id}
                            note={note}
                            board={board}
                            list={list}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
      <div style={visibleNoteFormStyle}>
        <CreateNoteForm
          listId={list.id}
          boardId={board.id}
          setVisibleNoteForm={setVisibleNoteForm}
        />
      </div>
    </div>
  )
}

export default ShowList
