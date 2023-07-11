'use client';

export function CreateFolderValidator() {
    
    let error:string;
    const blacklist = ['/'];

    const check = (value: string) => {
        if (value.length === 0) {
            error = 'value_empty';
            return false;
        }

        if (value.length > 16) {
            error = 'value_so_large';
            return false;
        }

        for (let index = 0; index < blacklist.length; index++) {
            const element = blacklist[index];
            if (value.includes(element)) {
                error = 'value_invalid_character';
                return false;
            }
        }

        return true;
    };

    const getError = () => {
        switch (error) {
            case 'value_empty':
                return 'The string is empty';
            case 'value_invalid_character':
                return `The string cannot contain ${blacklist.join(', ')}`;
                case 'value_so_large':
                return 'The string is so large';
            default:
                break;
        }
    };

    return {check, getError};
}