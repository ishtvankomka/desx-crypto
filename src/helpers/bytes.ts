export const stringToBytes = (str: string): number[] =>
    Array.from(str).map((char) => char.charCodeAt(0));

export const bytesToString = (bytes: number[]): string =>
    String.fromCharCode.apply(null, bytes);

export const stringToBytesFormatted = (str: string): string =>
    Array.from(str).map((char) => char.charCodeAt(0)).join(' ')
