import { INVERSE_IP_TABLE, IP_TABLE } from "../constants/ipTable";

export const xorArrays = (arr1: number[], arr2: number[]): number[] =>
    arr1.map((value, index) => value ^ arr2[index % arr2.length]);

export const whitening = (keyBytes: number[], tweakBytes: number[]): number[] =>
    xorArrays(keyBytes, tweakBytes);

export const initialPermutation = (input: number[]): number[] =>
    IP_TABLE.map((index) => input[index - 1]);

export const feistelRound = (rightHalf: number[], roundKey: number[]): number[] =>
    xorArrays(rightHalf, roundKey);

export const inverseInitialPermutation = (input: number[]): number[] =>
    INVERSE_IP_TABLE.map((index) => input[index - 1]);
