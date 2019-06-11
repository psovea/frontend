import { createStore } from 'redux'
import { stateHandler } from './reducers.js'

export const store = createStore(stateHandler)
console.log(store.getState())