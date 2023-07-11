'use client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const controller = new AbortController();

interface IUploadFileProps {
    file:File,
    path:string
}

export const uploadFile = createAsyncThunk('uploadFiles/upload', async function({file, path=''}:IUploadFileProps, {dispatch, getState}) {
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
    const id = stateFiles.length !== 0 ? stateFiles.at(-1).id + 1 : 0 ;
    dispatch(setFiles([...stateFiles, {id: id, name: file.name, progress: 0, status: 'PENDING'}]));

    const data = new FormData();
    data.append('file', file, file.name);

    await axios.post(`http://46.146.194.137:4000/files/upload?path=${path}`, data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
        onUploadProgress: upload => {
            const progress = Math.round((100 * upload.loaded) / upload.total);                        
            dispatch(setUploadProgress({id, progress}));
        },
        signal: controller.signal
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
            const id = action.payload.id;

            const file = state.files.filter((file) => {
                return file.id === id;
            })[0];

            if (file === undefined) {
                return;
            }
            
            file.progress = action.payload.progress;

            if (file.progress === 100) {
                file.status = 'FULLFILLED';
                return;
            }

            file.status = 'PROCESSING';
        },
        removeUploadFiles: (state, action: PayloadAction<any>) => {
            state.files = [];
        },
        cancelUploading: (state, action: PayloadAction<any>) => {
            const id = action.payload.id;

            const file = state.files.filter((file) => {
                return file.id === id;
            })[0];

            if (file === undefined) {
                return;
            }

            if (file.status == 'CANCELED' || file.status == 'FULLFILLED') {
                state.files = state.files.filter((file) => file.id != file.id);
            }
            
            controller.abort();
            file.progress = 0;
            file.status = 'CANCELED';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(uploadFile, (state, action) => {
            return state;
        })
    },
})

export const { 
    setFiles,
    setUploadProgress,
    removeUploadFiles,
    cancelUploading
} = uploadFilesSlice.actions;

export const selectUploadFiles = (state: any) => state.uploadfiles.files;

export const UploadFilesReduser = uploadFilesSlice.reducer;