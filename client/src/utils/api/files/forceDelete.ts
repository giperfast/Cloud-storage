'use server';
import { IFile } from '@/types/file';
import axios from 'axios';
import { cookies } from 'next/headers';
import { result } from '../result/result';

export const forceDeleteFiles = async (files: Array<IFile>) => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value;

    if (!session) {
        return result(false, 'Session error, reload page');
    }
    
    if (files.length === 0) {
        return result(false, 'Files not found');
    }
    
    var data = new URLSearchParams();
    for (const file of files) {
        data.append('files[]', file.file_id);
    }

    await axios.post('http://localhost:4000/files/force-delete', data, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`
        },
    });

    return result(true);
};