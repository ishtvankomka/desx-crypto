import CryptoJS from 'crypto-js';

export const generateKey = (): string =>
    CryptoJS.lib.WordArray.random(64 / 8).toString();
