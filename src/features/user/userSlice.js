import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: localStorage.getItem('access_token') !== null,
        isCustomer: localStorage.getItem('user_type') === 'C',
        isReviewer: localStorage.getItem('user_type') === 'R',
    },
    reducers: {
        userLogin: (state, action) => {
            state.isAuthenticated = true;
            if (action.payload.userType === 'C') {
                state.isCustomer = true;
            } else if (action.payload.userType === 'R') {
                state.isReviewer = true;
            }
        },
        userLogout: state => {
            state.isAuthenticated = false;
            state.isCustomer = false;
            state.isReviewer = false;
        },
    },
});

export const {
    userLogin,
    userLogout,
} = userSlice.actions;

export const userReducer = userSlice.reducer;