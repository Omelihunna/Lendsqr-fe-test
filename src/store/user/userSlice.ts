import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "./userApi"; // adjust import path as needed

interface User {
    id: string;
    name: string;
    email: string;
    // extend as needed
}

interface UserState {
    selectedUserId: string | null;
    selectedUser: User | null;
    allUsers: User[];
}

const initialState: UserState = {
    selectedUserId: null,
    selectedUser: null,
    allUsers: [],
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        selectUser: (state, action: PayloadAction<string>) => {
            state.selectedUserId = action.payload;
        },
        clearSelectedUser: (state) => {
            state.selectedUserId = null;
            state.selectedUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle getUsers
            .addMatcher(
                userApi.endpoints.getUsers.matchFulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.allUsers = action.payload;
                }
            )
            // Handle getUserById
            .addMatcher(
                userApi.endpoints.getUserById.matchFulfilled,
                (state, action: PayloadAction<User>) => {
                    state.selectedUser = action.payload;
                    state.selectedUserId = action.payload.id;
                }
            );
    },
});

export const { selectUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;