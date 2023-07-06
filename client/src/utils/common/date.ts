'use client'


function datediff(first, second) {  
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export function convertUnixToDays(unix: number) {
    return datediff(Date.now(), unix*1000)
}