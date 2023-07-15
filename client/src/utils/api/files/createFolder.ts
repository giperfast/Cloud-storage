'use server';
import { cookies } from 'next/headers';
import { IResult, result } from '../result/result';

export const createFolder = async (name:string, path:string = ''): Promise<IResult> => {
    const cookieStore = cookies();
    const session = cookieStore.get('cloud_session')?.value;

    if (!session) {
        return result(false, 'Session error, reload page');
    }

    var data = new URLSearchParams();
    data.append('name', name);
    if (path !== '') {
        data.append('path', path);
    }

    const response = await fetch(`http://localhost:4000/files/create-folder?${data}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
    }).catch((error) => {
        console.log(error);
        return result(false, 'Error, check console');
    });

    if (!response) {
		return result(false, 'Internal server error');
	}

	const json = await response.json();
    
	if (json?.error !== undefined) {
		return result(false, json.error);
	}

    return result(true);
};