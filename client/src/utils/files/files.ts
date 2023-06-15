
export function generateFullName(name, extension) {
    return `${name}.${extension}`;
}

export function generateShortName(name, extension) {
    const MAX_LENGTH = 12;

    if (name.length <= MAX_LENGTH) {
        return generateFullName(name, extension);
    }

    const first_half = name.slice(0, MAX_LENGTH/2)
    const second_half = name.slice(-(MAX_LENGTH/2), name.length)
    return `${first_half}...${second_half}.${extension}`;
}