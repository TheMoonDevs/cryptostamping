import { configureStore } from '@reduxjs/toolkit'
import uiReducer from 'lib/redux/features/uiSlice'
import userReducer from 'lib/redux/features/userSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer
  },
})