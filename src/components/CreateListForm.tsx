/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-restricted-globals */
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createList } from '../reducers/boardsReducer'

const CreateListForm = ({
  boardId,
  setVisibleListForm,
}: {
  boardId: string
  setVisibleListForm: Dispatch<SetStateAction<boolean>>
}) => {
  const [listName, setListName] = useState('')
  const dispatch = useDispatch()

  const submit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (listName === '') {
      setVisibleListForm(false)
      setListName('')
    } else {
      dispatch(createList(listName, boardId))
      setVisibleListForm(false)
      setListName('')
    }
  }

  return (
    <>
      <div className="list">
        <div className="head">
          <div className="text">
            <form onSubmit={submit}>
              <div>
                <input
                  className="inputCreateListForm"
                  value={listName}
                  onChange={({ target }) => setListName(target.value)}
                  placeholder="Name of the list"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <a
        className="cancelListRenameButton"
        href="#"
        onClick={() => {
          setVisibleListForm(false)
          setListName('')
        }}
      >
        cancel
      </a>
    </>
  )
}

export default CreateListForm
