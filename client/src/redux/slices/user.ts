'use client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type User = {
    username: string,
    avatar: string,
}

export interface UserState {
  data: Object|null
}

const initialState: UserState = {
    data: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserState>) => {
            state.data = action.payload;
        },
    },
})

export const { setUserData } = userSlice.actions

export const selectUser = (state: AppState) => state.user.data

export const UserReduser = userSlice.reducer;