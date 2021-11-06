import createReducer from './createReducer';
import { SET_ANSWER } from '../types';

const initialState = {
    answer: []
};

export default createReducer({
    [SET_ANSWER]: (state, { answer }) => ({
        ...state, answer
    })
}, initialState);
