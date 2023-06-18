'use client'
import { parseCookies } from 'nookies'

export const uploadFiles = async (files: FileList) => {
    //const test = useAppSelector(selectUser);
    console.log(files.length);
    if (files.length === 0) {
        return false;
    }
    
    var data = new FormData();

    for (let i = 0; i < files.length; i++) {

        const file: File | null = files[i];

        if (file == null) {
            continue;
        }

        data.append('files[]', file, file.name);
    }
    //data.append('files', ...files)

    //const cookieStore = cookies();
    //const session = cookieStore.get('cloud_session')?.value
    
    const cookies = parseCookies()
    const session = cookies['cloud_session']
    console.log(session);
    
    if (!session) {
        return false;
    }

    const request = await fetch(`http://localhost:4000/files/upload`, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json',
            'Authorization': `bearer ${session}`,
        },
        cache: 'no-store'
    }).catch((error) => {
        console.log(error);
    });
}