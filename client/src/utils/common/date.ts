'use client';


function datediff(first: number, second: number) {  
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export function convertUnixToDays(unix: number) {
    return datediff(Date.now(), unix*1000);
}