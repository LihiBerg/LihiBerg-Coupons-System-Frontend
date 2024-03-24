import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        purchaseVisibility: false, deleteVisibility: false, errorMessage: ''
    },
    reducers: {
        togglePurchaseVisibility(state) {
            state.purchaseVisibility = !state.purchaseVisibility;
        },
        toggleDeleteVisibility(state, action) {
            const deleteVisibility = action.payload;
            state.deleteVisibility = deleteVisibility;
        },
        loadError(state, action) {
            const errorMessage = action.payload;
            state.errorMessage = errorMessage
        }
    }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer