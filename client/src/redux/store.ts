import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { UserReduser } from './slices/user';

export function makeStore() {
  return configureStore({
    reducer: {
        user: UserReduser,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store