import {configureStore} from '@reduxjs/toolkit'
import { oneSlice } from './Slices'

//Se configura todos los slices que se van creando
export default configureStore({
  reducer:{
    firstSlice:oneSlice.reducer,
  }
})