'use client'

export function generateFullName(name: string, extension: string|null = null) {
    if (extension === null) {
        return name;
    }

    return `${name}.${extension}`;
}

export function generateShortName(name: string, extension: string|null = null) {
    const MAX_LENGTH = 12;
    
    if (name.length <= MAX_LENGTH) {
        return generateFullName(name, extension);
    }

    const first_half = name.slice(0, MAX_LENGTH/2)
    const second_half = name.slice(-(MAX_LENGTH/2), name.length)

    if (extension === null) {
        return `${first_half}...${second_half}`;
    }

    return `${first_half}...${second_half}.${extension}`;
}