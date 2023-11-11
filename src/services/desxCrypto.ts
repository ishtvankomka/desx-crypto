import { feistelRound, initialPermutation, inverseInitialPermutation, whitening, xorArrays } from "../helpers/crypto";

export const desx = (bytes: number[], keyBytes: number[], tweakBytes: number[]): number[] => {
    // Break the input bytes into 64 byte blocks (function not )
    const blocks = splitArrayIntoBlocks(bytes, 64);

    // Encrypt each block separately
    const encryptedBlocks = blocks.map((block) => {
        // 1. Key Whitening
        let keyWhitened = whitening(keyBytes, tweakBytes);

        // 2. Initial Permutation (IP)
        let permutedText = initialPermutation(block);

        // 3. Rounds of Feistel Network
        for (let round = 0; round < 16; round++) {
            const leftHalf = permutedText.slice(0, 32);
            const rightHalf = permutedText.slice(32);
            const roundKey = keyWhitened.slice(0, 48);

            const newRightHalf = feistelRound(rightHalf, roundKey);

            // Update for the next round
            keyWhitened = xorArrays(leftHalf, rightHalf);
            permutedText = leftHalf.concat(newRightHalf);
        }

        // 4. Inverse Initial Permutation (IP^(-1))
        const encryptedText = inverseInitialPermutation(permutedText);

        // 5. Final Whitening
        return whitening(encryptedText, tweakBytes);
    });

    // Concatenate the encrypted blocks back into a single array
    return encryptedBlocks.reduce((acc, block) => acc.concat(block), []);
};

const splitArrayIntoBlocks = (array: number[], blockSize: number): number[][] => {
    const blocks = [];
    for (let i = 0; i < array.length; i += blockSize) {
        blocks.push(array.slice(i, i + blockSize));
    }
    return blocks;
};
