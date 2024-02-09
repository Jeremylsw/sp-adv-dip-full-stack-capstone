// storage.js
import { configureStore } from '@reduxjs/toolkit'
import entityReducer from './entityReducer.js'
import authenticationReducer from './authenticationReducer.js'

export default configureStore({
  reducer: {
    // Register reducers here
    entity: entityReducer,
    authentication: authenticationReducer
  }
})