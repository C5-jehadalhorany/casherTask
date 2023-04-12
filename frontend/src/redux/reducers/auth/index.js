import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || "",
        isLoggedIn: localStorage.getItem("token") ? true : false,
        roles: localStorage.getItem("role") || ""
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            state.token = "";
            state.isLoggedIn = false;
            localStorage.clear();
        },
        role_id: (state, action) => {
            localStorage.setItem("role", action.payload)
            state.roles = action.payload
        }
    }
})

export const { login, logout, role_id } = authSlice.actions

export const selectToken = state => state.auth.token;

export default authSlice.reducer