import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        appliedSelectedItems: {},
    },
    reducers: {
        setAppliedSelectedItems: (state, action) => {
            const { category, items } = action.payload;
            state.appliedSelectedItems = {
                ...state.appliedSelectedItems,
                [category]: items,
            };
        },
        deleteFilter: (state, action) => {
            const { category, itemId } = action.payload;
            if (state.appliedSelectedItems[category]) {
                state.appliedSelectedItems[category] = state.appliedSelectedItems[category].filter(
                    (item) => item.id !== itemId
                );
            }
        },
        clearAllFilters: (state) => {
            state.appliedSelectedItems = {};
        },
    },
});

export const { setAppliedSelectedItems, deleteFilter, clearAllFilters } = filterSlice.actions;
export default filterSlice.reducer;