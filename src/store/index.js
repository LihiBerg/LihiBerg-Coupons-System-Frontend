import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Auth-Slice'
import userReducer from './User-Slice'
import uiReducer from './Ui-Slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        ui: uiReducer
    }
})

export default store