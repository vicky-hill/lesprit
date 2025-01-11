import { configureStore } from '@reduxjs/toolkit'
import listReducer from './slices/list.slice'
import wordReducer from './slices/word.slice'

export const makeStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      listReducer: listReducer,
      wordReducer: wordReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
