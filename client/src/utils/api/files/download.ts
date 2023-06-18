'use client'

import { parseCookies } from 'nookies'

export const downloadFiles = async (files: any) => {
    const cookies = parseCookies()
    const session = cookies['cloud_session']

    if (!session) {
        return null;
    }

    const params = new URLSearchParams();

    for (const file of files) {
      params.append('file', file.file_id);
    }

    const response = await fetch(`http://localhost:4000/files/download?${String(params)}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
        cache: 'no-store'
    }).catch((error) => {
        console.log(error);
    });

    if (response?.status !== 200) {
        return null;
    }

    const reader = response.body.getReader();

    const file_size = response.headers.get('Content-Length');
    let received_length = 0;
    let chunks = [];

    while(true) {
        const {done, value} = await reader.read();
      
        if (done) {
          break;
        }

        chunks.push(value);
        received_length += value.length;

        console.log("download progress:", Math.round((received_length / file_size) * 100));
    }

    const blob = new Blob(chunks);
    
    return blob;
}