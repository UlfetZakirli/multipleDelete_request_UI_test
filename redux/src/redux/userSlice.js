import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/users"
})


export const getUsersAsync = createAsyncThunk('users/getUsersAsync', async () => {
    const { data } = await axiosInstance.get()
    return data
})

export const updateUserAsync = createAsyncThunk('users/updateUserAsync', async (updatedUser) => {
    console.log(updatedUser.id);
    const { data } = await axiosInstance.patch(`/${updatedUser.id}`, updatedUser)
    return data
})

export const deleteUserAsync = createAsyncThunk("users/deleteUserAsync", async (usersId) => {
    await Promise.all([
        usersId.forEach(async (id) => {
            await axiosInstance.delete(`/${id}`)
        })
    ])
    return usersId
})


const initialState = {
    users: [],
    checked: [],
    isLoading: true
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUsersAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            state.checked = action.payload.filter((user) => user.checked).map((item) => item.id)
        });
        builder.addCase(updateUserAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            state.users = state.users.map((user) => user.id === action.payload.id ? { ...user, ...action.payload } : user)
        });
        builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
            console.log(action.payload);
            state.users = state.users.filter((user) => !action.payload.includes(user.id))
        })

    }
})

export default userSlice.reducer