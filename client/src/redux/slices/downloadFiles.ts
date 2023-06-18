'use client'
import { generateFullName } from '@/utils/files/files';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { parseCookies } from 'nookies'

export const downloadFile = createAsyncThunk('downloadFiles/download', async function(file, {dispatch, getState}) {
    
    if (file === null) {
        return false;
    }
    console.log(file);
    
    const cookies = parseCookies()
    const session = cookies['cloud_session']
    
    if (!session) {
        return false;
    }
    
    const state = getState();
    console.log(state.downloadfiles.files);
    const stateFiles = selectDownloadFiles(state);
    
    const file_id = file['file_id'];
    dispatch(setFiles([...stateFiles, {file_id: file_id, name: file['name'], progress: 0}]));

    let query = new URLSearchParams();
    query.append('file', file_id);

    const result = await axios.get(`http://localhost:4000/files/download?${query}`, {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
        onDownloadProgress: download => {
            let progress = Math.round((100 * download.loaded) / download.total);    
            console.log(progress);            
            dispatch(setDownloadProgress({file_id, progress}));
        },
    });

    const blob = new Blob([result.data], {
        type: file['type'],
    });

    const file_url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = file_url;
    link.download = generateFullName(file['name'], file['extension']);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
});

export const downloadFilesSlice = createSlice({
    name: 'downloadFiles',
    initialState: {
        files: [],
    },
    reducers: {
        setFiles: (state, action: PayloadAction<any>) => {
            state.files = action.payload;
        },
        setDownloadProgress: (state, action: PayloadAction<any>) => {
            const file_id = action.payload.file_id;
            
            console.log(file_id);

            const file = state.files.filter((file) => {
                return file.file_id === file_id
            })[0]

            if (file === undefined) {
                return state
            }
            console.log(file, action.payload.progress);
            
            file.progress = action.payload.progress;
        },
        removeDownloadFiles: (state, action: PayloadAction<any>) => {
            state.files = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(downloadFile, (state, action) => {
            return state
        })
    },
})

export const { setFiles, setDownloadProgress, removeDownloadFiles } = downloadFilesSlice.actions

export const selectDownloadFiles = (state: any) => state.downloadfiles.files

export const DownloadFilesReduser = downloadFilesSlice.reducer;