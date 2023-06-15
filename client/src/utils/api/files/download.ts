//'use server'
//import 'server-only'
//import { cookies } from 'next/headers';
//import { cache } from 'react';

import { parseCookies } from 'nookies'

export const downloadFiles = async (files) => {
    console.log(files);
    
    //const cookieStore = cookies();
    //const session = cookieStore.get('cloud_session')?.value
    
    const cookies = parseCookies()
    const session = cookies['cloud_session']

    if (!session) {
        return null;
    }

    const params = new URLSearchParams();

    for (const file of files) {
      params.append('files', file.file_id);
    }

    const request = await fetch(`http://localhost:4000/files/download?${String(params)}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
        cache: 'no-store'
        //next: { revalidate: 60 },
    }).catch((error) => {
        console.log(error);
    });

    if (request?.status !== 200) {
        return null;
    }
    
    const blob = await request.blob();
    console.log(blob);
    
    return blob;
}