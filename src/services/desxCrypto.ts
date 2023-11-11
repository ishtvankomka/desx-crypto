import { feistelRound, initialPermutation, inverseInitialPermutation, whitening, xorArrays } from "../helpers/crypto";

export const desx = (bytes: number[], keyBytes: number[], tweakBytes: number[]): number[] => {
    // 1. Key Whitening
    let keyWhitened = whitening(keyBytes, tweakBytes);

    // 2. Initial Permutation (IP)
    let permutedText = initialPermutation(bytes);

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
};