import { configureStore } from '@reduxjs/toolkit'
import listReducer from './slices/list.slice'

export const makeStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      lists: listReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
