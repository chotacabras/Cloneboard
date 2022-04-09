/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import boardsReducer from './reducers/boardsReducer'

const reducer: any = boardsReducer

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
