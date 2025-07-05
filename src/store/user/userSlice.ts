import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import type {User} from "../../constants/constants.ts"; // adjust import path as needed

interface FilterValues {
    organization: string;
    username: string;
    email: string;
    date: string;
    phone: string;
    status: string;
}

interface UserState {
    selectedUserId: string | null;
    selectedUser: User | null;
    allUsers: User[];
    // Filter state
    isFilterOpen: boolean;
    filterValues: FilterValues;
}

const initialFilterValues: FilterValues = {
    organization: '',
    username: '',
    email: '',
    date: '',
    phone: '',
    status: '',
};

const initialState: UserState = {
    selectedUserId: null,
    selectedUser: null,
    allUsers: [],
    isFilterOpen: false,
    filterValues: initialFilterValues,
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
        // Filter actions
        openFilterModal: (state) => {
            state.isFilterOpen = true;
        },
        closeFilterModal: (state) => {
            state.isFilterOpen = false;
        },
        updateFilterValues: (state, action: PayloadAction<FilterValues>) => {
            state.filterValues = action.payload;
        },
        resetFilters: (state) => {
            state.filterValues = initialFilterValues;
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

export const { 
    selectUser, 
    clearSelectedUser, 
    openFilterModal, 
    closeFilterModal, 
    updateFilterValues, 
    resetFilters 
} = userSlice.actions;

export type { FilterValues };
export default userSlice.reducer;