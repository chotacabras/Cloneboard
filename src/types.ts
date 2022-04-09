export interface Note {
  text: string
  id: string
}

export interface List {
  name: string
  notes: Note[]
  id: string
}

export interface Board {
  name: string
  lists: List[]
  id: string
}

export interface ListAction {
  name: string
  boardId: string
}

export interface NoteAction {
  text: string
  listId: string
  boardId: string
}

export interface DeleteBoard {
  boardId: string
}

export interface DeleteList {
  listId: string
  boardId: string
}

export interface DeleteNote {
  listId: string
  boardId: string
  noteId: string
}

export interface RenameBoard {
  newName: string
  boardId: string
}

export interface RenameList {
  newName: string
  listId: string
  boardId: string
}

export interface RenameNote {
  newText: string
  listId: string
  boardId: string
  noteId: string
}

export interface MoveNoteSameList {
  newNotes: Note[]
  listId: string
  boardId: string
}

export interface MoveNoteDiffList {
  sourceNotes: Note[]
  destNotes: Note[]
  sourceListId: string
  destListId: string
  boardId: string
}

export interface MoveList {
  listId: string
  boardId: string
}