'use client';
import { IFile } from '@/types/file';
import { generateFullName } from '@/utils/common/files';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

const controller = new AbortController();

export const downloadFile = createAsyncThunk('downloadFiles/download', async function(files: Array<IFile>, {dispatch, getState}) {
    
    if (files === null) {
        return false;
    }

    const cookies = parseCookies();
    const session = cookies['cloud_session'];
    
    if (!session) {
        return false;
    }
    
    const state = getState();
    const stateFiles = selectDownloadFiles(state);
    
    const id = stateFiles.length !== 0 ? stateFiles.at(-1).id + 1 : 0 ;

    if (files.length > 1) {
        dispatch(setFiles([...stateFiles, {
            id: id,
            file_id: '',
            name: 'files',
            extension: 'zip',
            progress: 0,
            status: 'PENDING'
        }]));
    } else {
        dispatch(setFiles([...stateFiles, {
            id: id,
            file_id: files[0]['file_id'],
            name: files[0]['name'],
            extension: files[0]['extension'],
            progress: 0,
            status: 'PENDING'
        }]));
    }

    const query = new URLSearchParams();

    for (const file of files) {
        query.append('file', file.file_id);
    }

    /*let lastNow = Date.now();
    let lastKBytes = 0;*/

    const result = await axios.get(`http://46.146.194.137:4000/files/download?${query}`, {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
        onDownloadProgress: download => {
            //console.log(download);
            
            /*const now = Date.now();
            const bytes = download.loaded;
            const kbytes = bytes / 1024;
            const uploadedkBytes = kbytes - lastKBytes;
            const elapsed = (now - lastNow) / 1000;
            const kbps =  elapsed ? uploadedkBytes / elapsed : 0 ;
            lastKBytes = kbytes;
            lastNow = now;
            console.log(kbps.toFixed(2) + "KB/s");*/

            const progress = Math.round((100 * download.loaded) / download.total);
            dispatch(setDownloadProgress({id, progress}));
        },
        signal: controller.signal
    });

    const blob = new Blob([result.data], {
        type: result.headers['content-type'],
    });

    const file_url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = file_url;

    if (files.length > 1) {
        link.download = generateFullName('files', 'zip');
    } else {
        link.download = generateFullName(files[0]['name'], files[0]['extension']);
    }

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
        removeDownloadFiles: (state, action: PayloadAction<any>) => {
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
                state.files = state.files.filter((filter_file) => filter_file.id != file.id);
            }
            
            controller.abort();
            file.progress = 0;
            file.status = 'CANCELED';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(downloadFile, (state, action) => {
            return state;
        });
    },
});

export const { setFiles, setDownloadProgress, removeDownloadFiles } = downloadFilesSlice.actions;

export const selectDownloadFiles = (state: any) => state.downloadfiles.files;

export const DownloadFilesReduser = downloadFilesSlice.reducer;