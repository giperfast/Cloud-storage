'use client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        files: [],
    },
    reducers: {
        setFiles: (state, action: PayloadAction<any>) => {
            state.files = [action.payload];
        },
        removeFiles: (state) => {
            state.files = [];
        },
        addFile: (state, action: PayloadAction<any>) => {
            state.files = [...state.files, action.payload]
        },
        removeFile: (state, action: PayloadAction<any>) => {
            state.files = state.files.filter((file) => file.file_id != action.payload);
        },

        /*setContextFile: (state, action: PayloadAction<any>) => {
            state.contextFile = [action.payload];
        },
        removeContextFile: (state) => {
            state.contextFile = [];
        },*/
    },
})

export const { setFiles, removeFiles, addFile, removeFile } = filesSlice.actions

export const selectFiles = (state: any) => state.files.files

export const selectContextFile = (state: any) => state.files.contextFile

export const FilesReduser = filesSlice.reducer;