import { createSlice } from '@reduxjs/toolkit'

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: 'login',
    reducers: {
        login: () => {
            return 'login';
        },

        register: (state, action) => {
            return 'register';
        }
    }
})

export const selectAuthentication = (state) => state.authentication;
export const { login, register } = authenticationSlice.actions;
export default authenticationSlice.reducer;