/* eslint-disable @typescript-eslint/require-await */
import { v4 } from 'uuid'
import {
  Board,
  DeleteBoard,
  DeleteList,
  DeleteNote,
  List,
  ListAction,
  MoveList,
  MoveNoteDiffList,
  MoveNoteSameList,
  Note,
  NoteAction,
  RenameBoard,
  RenameList,
  RenameNote,
} from '../types'

const uuid = v4
type Dispatch<T> = (arg0: { type: string; data: T }) => void

const boardsReducer = (
  state: Board[] = [],
  action: {
    type: string
    data:
      | string
      | Board[]
      | ListAction
      | NoteAction
      | DeleteBoard
      | DeleteList
      | DeleteNote
  }
) => {
  switch (action.type) {
    case 'CREATE_BOARD': {
      const newBoard = {
        name: action.data,
        lists: [],
        id: uuid(),
      } as Board
      const newState = state.concat(newBoard)
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'CREATE_LIST': {
      const data = action.data as ListAction
      const newList = {
        name: data.name,
        notes: [],
        id: uuid(),
      } as List
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const boardModified = {
        ...boardToModify,
        lists: boardToModify.lists.concat(newList),
      }
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'CREATE_NOTE': {
      const data = action.data as NoteAction
      const newNote = {
        text: data.text,
        id: uuid(),
      } as Note
      const listId = data.listId
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const listToModify = boardToModify.lists.find(
        (list) => list.id === listId
      ) as List
      const listModified = {
        ...listToModify,
        notes: listToModify.notes.concat(newNote),
      } as List
      const boardModified = {
        ...boardToModify,
        lists: boardToModify.lists.map((list) =>
          list.id === listId ? listModified : list
        ),
      } as Board
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'DELETE_BOARD': {
      const data = action.data as DeleteBoard
      const boardId = data.boardId
      const boardToDelete = state.find((board) => board.id === boardId) as Board
      const newState = state.filter((board) => board.id !== boardId)
      if (boardToDelete.lists.length > 0) {
        if (
          window.confirm(
            `PERMANENTLY delete this board "${boardToDelete.name}", all its lists and their notes?`
          )
        ) {
          localStorage.setItem('boards', JSON.stringify(newState))
          localStorage.setItem('deletedBoard', JSON.stringify(true))
          return newState
        } else return state
      } else {
        localStorage.setItem('boards', JSON.stringify(newState))
        localStorage.setItem('deletedBoard', JSON.stringify(true))
        return newState
      }
    }
    case 'DELETE_LIST': {
      const data = action.data as DeleteList
      const listId = data.listId
      const boardId = data.boardId
      const boardOfListToDelete = state.find(
        (board) => board.id === boardId
      ) as Board
      const listsOfBoardUpdated = boardOfListToDelete.lists.filter(
        (list) => list.id !== listId
      )
      const boardModified = {
        ...boardOfListToDelete,
        lists: listsOfBoardUpdated,
      }
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      const listToDelete = boardOfListToDelete.lists.find(
        (list) => list.id === listId
      ) as List
      if (listToDelete.notes.length > 0) {
        if (
          window.confirm(
            `Delete this list "${listToDelete.name}", and its notes?`
          )
        ) {
          localStorage.setItem('boards', JSON.stringify(newState))
          return newState
        } else return state
      } else {
        localStorage.setItem('boards', JSON.stringify(newState))
        return newState
      }
    }
    case 'DELETE_NOTE': {
      const data = action.data as DeleteNote
      const listId = data.listId
      const boardId = data.boardId
      const noteId = data.noteId
      const boardOfNoteToDelete = state.find(
        (board) => board.id === boardId
      ) as Board
      const listOfNoteToDelete = boardOfNoteToDelete.lists.find(
        (list) => list.id === listId
      ) as List
      const notesOfListUpdated = listOfNoteToDelete.notes.filter(
        (note) => note.id !== noteId
      )
      const listModified = { ...listOfNoteToDelete, notes: notesOfListUpdated }
      const listsOfBoardModified = boardOfNoteToDelete.lists.map((list) =>
        list.id === listId ? listModified : list
      )
      const boardModified = {
        ...boardOfNoteToDelete,
        lists: listsOfBoardModified,
      } as Board
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'RENAME_BOARD': {
      const data = action.data as RenameBoard
      const newName = data.newName
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId)
      const boardModified = { ...boardToModify, name: newName } as Board
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'RENAME_LIST': {
      const data = action.data as RenameList
      const newName = data.newName
      const listId = data.listId
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const listToModify = boardToModify.lists.find(
        (list) => list.id === listId
      ) as List
      const listModified = { ...listToModify, name: newName }
      const listsOfBoardModified = boardToModify.lists.map((list) =>
        list.id === listId ? listModified : list
      )
      const boardModified = { ...boardToModify, lists: listsOfBoardModified }
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'RENAME_NOTE': {
      const data = action.data as RenameNote
      const newText = data.newText
      const listId = data.listId
      const boardId = data.boardId
      const noteId = data.noteId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const listToModify = boardToModify.lists.find(
        (list) => list.id === listId
      ) as List
      const noteToModify = listToModify.notes.find(
        (note) => note.id === noteId
      ) as Note
      const noteModified = { ...noteToModify, text: newText }
      const notesOfListModified = listToModify.notes.map((note) =>
        note.id === noteId ? noteModified : note
      )
      const listModified = { ...listToModify, notes: notesOfListModified }
      const listsOfBoardModified = boardToModify.lists.map((list) =>
        list.id === listId ? listModified : list
      )
      const boardModified = {
        ...boardToModify,
        lists: listsOfBoardModified,
      } as Board
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'MOVE_NOTE_SAME_LIST': {
      const data = action.data as MoveNoteSameList
      const newNotes = data.newNotes
      const listId = data.listId
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const listToModify = boardToModify.lists.find(
        (list) => list.id === listId
      ) as List
      const listModified = { ...listToModify, notes: newNotes }
      const listsOfBoardModified = boardToModify.lists.map((list) =>
        list.id === listId ? listModified : list
      )
      const boardModified = {
        ...boardToModify,
        lists: listsOfBoardModified,
      } as Board
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'MOVE_NOTE_DIFF_LIST': {
      const data = action.data as MoveNoteDiffList
      const sourceNotes = data.sourceNotes
      const destNotes = data.destNotes
      const sourceListId = data.sourceListId
      const destListId = data.destListId
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const sourceListToModify = boardToModify.lists.find(
        (list) => list.id === sourceListId
      ) as List
      const destListToModify = boardToModify.lists.find(
        (list) => list.id === destListId
      ) as List
      const sourceListModified = { ...sourceListToModify, notes: sourceNotes }
      const destListModified = { ...destListToModify, notes: destNotes }
      const sourceListOfBoardModified = boardToModify.lists.map((list) =>
        list.id === sourceListId ? sourceListModified : list
      )
      const destListOfBoardModified = sourceListOfBoardModified.map((list) =>
        list.id === destListId ? destListModified : list
      )
      const boardModified = {
        ...boardToModify,
        lists: destListOfBoardModified,
      } as Board
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'MOVE_LIST_LEFT': {
      const data = action.data as MoveList
      const listId = data.listId
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const listRight = boardToModify.lists.find(
        (list) => list.id === listId
      ) as List
      const indexOfListRight = boardToModify.lists.indexOf(listRight)
      if (indexOfListRight === 0) {
        return state
      }
      if (boardToModify.lists.length === 1) {
        return state
      }
      const listLeft = boardToModify.lists[indexOfListRight - 1]
      const indexOfListLeft = boardToModify.lists.indexOf(listLeft)
      boardToModify.lists[indexOfListLeft] = listRight
      boardToModify.lists[indexOfListRight] = listLeft
      const boardModified = { ...boardToModify }
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'MOVE_LIST_RIGHT': {
      const data = action.data as MoveList
      const listId = data.listId
      const boardId = data.boardId
      const boardToModify = state.find((board) => board.id === boardId) as Board
      const listLeft = boardToModify.lists.find(
        (list) => list.id === listId
      ) as List
      const indexOfListLeft = boardToModify.lists.indexOf(listLeft)
      if (indexOfListLeft === boardToModify.lists.length - 1) {
        return state
      }
      if (boardToModify.lists.length === 1) {
        return state
      }
      const listRight = boardToModify.lists[indexOfListLeft + 1]
      const indexOfListRight = boardToModify.lists.indexOf(listRight)
      boardToModify.lists[indexOfListLeft] = listRight
      boardToModify.lists[indexOfListRight] = listLeft
      const boardModified = { ...boardToModify }
      const newState = state.map((board) =>
        board.id === boardId ? boardModified : board
      )
      localStorage.setItem('boards', JSON.stringify(newState))
      return newState
    }
    case 'INIT_BOARDS': {
      return action.data
    }
    default:
      return state
  }
}

export const createBoard = (content: string) => {
  const boardToCreate = content
  return async (dispatch: Dispatch<string>) => {
    dispatch({
      type: 'CREATE_BOARD',
      data: boardToCreate,
    })
  }
}

export const createList = (name: string, boardId: string) => {
  return async (dispatch: Dispatch<{ name: string; boardId: string }>) => {
    dispatch({
      type: 'CREATE_LIST',
      data: { name, boardId },
    })
  }
}

export const createNote = (text: string, listId: string, boardId: string) => {
  return async (
    dispatch: Dispatch<{ text: string; listId: string; boardId: string }>
  ) => {
    dispatch({
      type: 'CREATE_NOTE',
      data: { text, listId, boardId },
    })
  }
}

export const deleteBoard = (boardId: string) => {
  return async (dispatch: Dispatch<{ boardId: string }>) => {
    dispatch({
      type: 'DELETE_BOARD',
      data: { boardId },
    })
  }
}

export const deleteList = (listId: string, boardId: string) => {
  return async (dispatch: Dispatch<{ listId: string; boardId: string }>) => {
    dispatch({
      type: 'DELETE_LIST',
      data: { listId, boardId },
    })
  }
}

export const deleteNote = (noteId: string, listId: string, boardId: string) => {
  return async (
    dispatch: Dispatch<{ noteId: string; listId: string; boardId: string }>
  ) => {
    dispatch({
      type: 'DELETE_NOTE',
      data: { noteId, listId, boardId },
    })
  }
}

export const renameBoard = (newName: string, boardId: string) => {
  return async (dispatch: Dispatch<{ newName: string; boardId: string }>) => {
    dispatch({
      type: 'RENAME_BOARD',
      data: { newName, boardId },
    })
  }
}

export const renameList = (
  newName: string,
  listId: string,
  boardId: string
) => {
  return async (
    dispatch: Dispatch<{ newName: string; listId: string; boardId: string }>
  ) => {
    dispatch({
      type: 'RENAME_LIST',
      data: { newName, listId, boardId },
    })
  }
}

export const renameNote = (
  newText: string,
  noteId: string,
  listId: string,
  boardId: string
) => {
  return async (
    dispatch: Dispatch<{
      newText: string
      noteId: string
      listId: string
      boardId: string
    }>
  ) => {
    dispatch({
      type: 'RENAME_NOTE',
      data: { newText, noteId, listId, boardId },
    })
  }
}

export const moveNoteSameList = (
  newNotes: Note[],
  listId: string,
  boardId: string
) => {
  return async (
    dispatch: Dispatch<{ newNotes: Note[]; listId: string; boardId: string }>
  ) => {
    dispatch({
      type: 'MOVE_NOTE_SAME_LIST',
      data: { newNotes, listId, boardId },
    })
  }
}

export const moveNoteDifferentList = (
  sourceNotes: Note[],
  destNotes: Note[],
  sourceListId: string,
  destListId: string,
  boardId: string
) => {
  return async (
    dispatch: Dispatch<{
      sourceNotes: Note[]
      destNotes: Note[]
      sourceListId: string
      destListId: string
      boardId: string
    }>
  ) => {
    dispatch({
      type: 'MOVE_NOTE_DIFF_LIST',
      data: { sourceNotes, destNotes, sourceListId, destListId, boardId },
    })
  }
}

export const moveListLeft = (listId: string, boardId: string) => {
  return async (dispatch: Dispatch<{ listId: string; boardId: string }>) => {
    dispatch({
      type: 'MOVE_LIST_LEFT',
      data: { listId, boardId },
    })
  }
}

export const moveListRight = (listId: string, boardId: string) => {
  return async (dispatch: Dispatch<{ listId: string; boardId: string }>) => {
    dispatch({
      type: 'MOVE_LIST_RIGHT',
      data: { listId, boardId },
    })
  }
}

export const initializeBoards = () => {
  const stored = localStorage.getItem('boards')
  const boards = stored === null ? [] : (JSON.parse(stored) as Board[])
  return async (dispatch: Dispatch<Board[]>) => {
    dispatch({
      type: 'INIT_BOARDS',
      data: boards,
    })
  }
}

export default boardsReducer
