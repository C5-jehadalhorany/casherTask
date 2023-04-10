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
        role: (state, action) => {
            localStorage.setItem("role", action.payload)
            state.roles = action.payload
            console.log(action);
        }
    }
})


export const { login, logout, role } = authSlice.actions

export default authSlice.reducer