'use server'

export async function convertBytes(bytes, type) {
    let result = 0;
    switch (type) {
        case 'GB':
            result = bytes / 1024 / 1024 / 1024
            break;
    
        default:
            break;
    }

    if (result <= 0) {
        return 0
    }

    if (result % 1 === 0) {
        return result
    }

    return result.toFixed(2);
}