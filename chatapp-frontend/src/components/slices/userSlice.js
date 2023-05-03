import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

let token = JSON.parse(localStorage.getItem('token'));

export const fetchUserProfile = createAsyncThunk('UserSlice/fetchUserProfile', async () => {
    const res = await axios.get(
        "http://localhost:8000/profile", {headers: {"Authorization": token,}}
    );
    return res.data.user
})

export const fetchAllUsers = createAsyncThunk('UserSlice/fetchAllUsers', async () => {
    const res = await axios.get(
        `http://localhost:8000/users`, {headers: {"Authorization": token,}}
    );
    return res.data.users
})

const UserSlice = createSlice({
    name: "UserSlice",
    initialState: {user :{}, users: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload
            return state
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
            return state
        })
    }
})

export const {} = UserSlice.actions;
export default UserSlice.reducer;