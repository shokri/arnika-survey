import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware = () => {
    const middlewareList = [thunk];
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        middlewareList.push(logger);
    }
    return middlewareList;
};

const store = createStore(
    reducers,
    {...JSON.parse(localStorage.getItem('survey') || JSON.stringify({app: {}}))},
    applyMiddleware(...middleware()),
);

store.subscribe((e) => {
    const states = {};
    Object.keys(store.getState()).map((key) => {
        if (store.getState()[key]['setStore'] !== false) {
            states[key] = store.getState()[key]
        }
        return null;
    });
    localStorage.setItem('survey', JSON.stringify(states));
});

export default store;
