'use client'
import { generateFullName } from '@/utils/files/files';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { parseCookies } from 'nookies'
import { IFileData } from '../../components/files/file/File';

export const downloadFile = createAsyncThunk('downloadFiles/download', async function(files: Array<IFileData>, {dispatch, getState}) {
    
    if (files === null) {
        return false;
    }

    const cookies = parseCookies()
    const session = cookies['cloud_session']
    
    if (!session) {
        return false;
    }
    
    const state = getState();
    const stateFiles = selectDownloadFiles(state);
    
    const id = stateFiles.length !== 0 ? stateFiles.at(-1).id + 1 : 0 ;

    if (files.length > 1) {
        dispatch(setFiles([...stateFiles, {id: id, file_id: '', name: 'files', extension: 'zip', progress: 0}]));
    } else {
        dispatch(setFiles([...stateFiles, {id: id, file_id: files[0]['file_id'], name: files[0]['name'], extension: files[0]['extension'], progress: 0}]));
    }

    let query = new URLSearchParams();

    for (const file of files) {
        query.append('file', file.file_id);
    }

    let lastNow = Date.now();
    let lastKBytes = 0;

    const result = await axios.get(`http://46.146.194.137:4000/files/download?${query}`, {
        responseType: 'arraybuffer',
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
        onDownloadProgress: download => {
            console.log(download);
            
            const now = Date.now();
            const bytes = download.loaded;
            const kbytes = bytes / 1024;
            const uploadedkBytes = kbytes - lastKBytes;
            const elapsed = (now - lastNow) / 1000;
            const kbps =  elapsed ? uploadedkBytes / elapsed : 0 ;
            lastKBytes = kbytes;
            lastNow = now;
            console.log(kbps.toFixed(2) + "KB/s");

            let progress = Math.round((100 * download.loaded) / download.total);
            dispatch(setDownloadProgress({id, progress}));
        },
    });

    console.log(result.headers['content-type']);
    
    const blob = new Blob([result.data], {
        type: result.headers['content-type'],
    });

    const file_url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = file_url;

    if (files.length > 1) {
        link.download = generateFullName('files', 'zip');
    } else {
        link.download = generateFullName(files[0]['name'], files[0]['extension']);
    }

    //link.download = generateFullName(file['name'], file['extension']);
    /*let filename = result.headers['content-disposition']
    console.log(filename);*/
    
    //link.download = generateFullName('files', 'zip');
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
                return file.id === id
            })[0]

            if (file === undefined) {
                return state
            }
            
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