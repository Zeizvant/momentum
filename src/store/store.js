import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Failed to load state from localStorage:', err);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        console.error('Failed to save state to localStorage:', err);
    }
};

const persistedState = loadState();

export const store = configureStore({
    reducer: {
        filter: filterReducer,
    },
    preloadedState: persistedState,
});

store.subscribe(() => {
    saveState(store.getState());
});