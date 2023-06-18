'use client'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { parseCookies } from 'nookies'

export const uploadFile = createAsyncThunk('uploadFiles/upload', async function(file, {dispatch, getState}) {

    if (file === null) {
        return false;
    }

    const cookies = parseCookies()
    const session = cookies['cloud_session']
    
    if (!session) {
        return false;
    }

    const state = getState();
    const stateFiles = selectUploadFiles(state);

    const file_id = stateFiles.length;
    dispatch(setFiles([...stateFiles, {file_id: file_id, name: file.name, progress: 0}]));

    let data = new FormData();
    data.append('file', file, file.name);

    await axios.post('http://localhost:4000/files/upload', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
        onUploadProgress: upload => {
            let progress = Math.round((100 * upload.loaded) / upload.total);                        
            dispatch(setUploadProgress({file_id, progress}));
        },
    });
});

export const uploadFilesSlice = createSlice({
    name: 'uploadFiles',
    initialState: {
        files: [],
    },
    reducers: {
        setFiles: (state, action: PayloadAction<any>) => {
            state.files = action.payload;
        },
        setUploadProgress: (state, action: PayloadAction<any>) => {
            const file_id = action.payload.file_id;
            if (state.files[file_id] === undefined) {
                return state
            }

            state.files[file_id].progress = action.payload.progress;
        },
        removeUploadFiles: (state, action: PayloadAction<any>) => {
            state.files = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(uploadFile, (state, action) => {
            return state
        })
    },
})

export const { setFiles, setUploadProgress, removeUploadFiles } = uploadFilesSlice.actions

export const selectUploadFiles = (state: any) => state.uploadfiles.files

export const UploadFilesReduser = uploadFilesSlice.reducer;