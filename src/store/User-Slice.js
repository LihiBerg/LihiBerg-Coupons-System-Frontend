import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        details: null, customer: false, company: false,
        userCoupons: [], allCoupons: []
    },
    reducers: {
        customer(state) {
            state.customer = true;
            state.company = false;
        },
        company(state) {
            state.company = true;
            state.customer = false;
        },
        loadUserDetails(state, action) {
            const details = action.payload;
            state.details = details;
            switch (Boolean) {
                case (state.customer):
                    details = {
                        id: action.payload.id,
                        first_name: action.payload.first_name,
                        last_name: action.payload.last_name,
                        email: action.payload.email,
                        password: action.payload.password
                    }
                    break;
                case (state.company):
                    details = {
                        id: action.payload.id,
                        name: action.payload.name,
                        email: action.payload.email,
                        password: action.payload.password
                    }
                    break;
                default:
                    state.details = details
            }
        },
        loadUserCoupons(state, action) {
            const userCoupons = action.payload;
            state.userCoupons = userCoupons
        },
        loadAllCoupons(state, action) {
            const allCoupons = action.payload;
            state.allCoupons = allCoupons
        }

    }
})

export const userActions = userSlice.actions
export default userSlice.reducer