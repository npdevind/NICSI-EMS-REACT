import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        isLogIn: false
    },
    reducers: {
        login(state, action) {
            const user = action.payload;
            state.data = {
                token: user.token,
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type
            };
            state.isLogIn = true
        },
        logout(state, action) {
            localStorage.removeItem("ems_token");
            state.user = {
                isLogIn: false,
                data: null
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions

export default UserSlice.reducer