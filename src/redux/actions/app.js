import { SET_ANSWER } from '../types';

export const setAnswer = (answer = []) => ({
    type: SET_ANSWER,
    answer
});