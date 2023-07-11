'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        files: [],
        unknown_files: [],
    },
    reducers: {
        setFiles: (state, action: PayloadAction<any>) => {
            state.files = [action.payload];
        },
        removeFiles: (state) => {
            state.files = [];
        },
        addFile: (state, action: PayloadAction<any>) => {
            if (state.files.findIndex((file) => file.file_id == action.payload.file_id) !== -1) {
                return;
            }

            state.files = [...state.files, action.payload];
        },
        removeFile: (state, action: PayloadAction<any>) => {
            state.files = state.files.filter((file) => file.file_id != action.payload);
        },

        setUnknownFiles: (state, action: PayloadAction<any>) => {
            state.unknown_files = action.payload;
        },
        removeUnknownFile: (state, action: PayloadAction<any>) => {
            state.unknown_files = state.unknown_files.filter((array_index) => array_index != action.payload);
        },
        removeUnknownFiles: (state) => {
            state.unknown_files = [];
        },
    },
})

export const { 
    setFiles,
    removeFiles,
    addFile,
    removeFile,
    setUnknownFiles,
    removeUnknownFile,
    removeUnknownFiles 
} = filesSlice.actions;

export const selectFiles = (state: any) => state.files.files;

export const selectUnknownFiles = (state: any) => state.files.unknown_files;

export const FilesReduser = filesSlice.reducer;