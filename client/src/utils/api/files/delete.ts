'use server'
import { IFile } from '@/types/file';
import axios from 'axios';
//import { parseCookies } from 'nookies'
import { cookies } from 'next/headers';

export const deleteFiles = async (files: Array<IFile>) => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value
    console.log(session);
    
    if (!session) {
        return false;
    }
    
    if (files.length === 0) {
        return false;
    }
    
    var data = new URLSearchParams();
    for (const file of files) {
        data.append('files[]', file.file_id);
    }

    await axios.post('http://localhost:4000/files/delete', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
    });
}