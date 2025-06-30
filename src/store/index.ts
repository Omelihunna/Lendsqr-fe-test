import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import { userApi } from "./user/userApi";

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
