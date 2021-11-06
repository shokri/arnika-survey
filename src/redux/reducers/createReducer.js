export default function createReducer(funcMap, initialState) {
    return (state = initialState, action) => {
        if (funcMap[action.type] !== undefined) {
            return funcMap[action.type](state, action);
        }
        return state;
    };
}