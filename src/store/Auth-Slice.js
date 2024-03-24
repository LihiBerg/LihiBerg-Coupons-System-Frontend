import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:
    {
        token: localStorage.getItem('token'),
        type: localStorage.getItem('type'),
    },
    reducers: {
        login(state, action) {
            const token = action.payload
            localStorage.setItem('token', token)
            state.token = token
            state.token = localStorage.getItem('token')
        },
        findType(state, action) {
            const type = action.payload
            localStorage.setItem('type', type)
            state.type = type
            state.type = localStorage.getItem('type')
        },

        logout(state) {
            localStorage.removeItem('token')
            state.token = undefined
            localStorage.removeItem('type')
            state.type = undefined
        }

    }
})

export const { login, findType, logout } = authSlice.actions
export default authSlice.reducer
