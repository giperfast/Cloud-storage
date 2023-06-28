'use client'
import { IFile } from '@/types/file';
import axios from 'axios';
import { parseCookies } from 'nookies'

export const restoreFiles = async (files: Array<IFile>) => {
    if (files.length === 0) {
        return false;
    }
    
    var data = new URLSearchParams();
    for (const file of files) {
        data.append('files[]', file.file_id);
    }
    
    const cookies = parseCookies()
    const session = cookies['cloud_session']

    if (!session) {
        return false;
    }

    await axios.post('http://localhost:4000/files/restore', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
    });
}