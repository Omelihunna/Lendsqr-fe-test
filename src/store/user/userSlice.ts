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
    allUsers: User[];
}

const initialState: UserState = {
    selectedUserId: null,
    allUsers: [],
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        selectUser: (state, action: PayloadAction<string>) => {
            state.selectedUserId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.getUsers.matchFulfilled,
            (state, action: PayloadAction<User[]>) => {
                state.allUsers = action.payload;
            }
        );
    },
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
