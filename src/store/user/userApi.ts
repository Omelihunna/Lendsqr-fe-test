import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {config} from "../../config/config.ts";
import type {User} from "../../constants/constants.ts";
import {cacheUser, getCachedUser} from "../../utils/helpers.ts";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.baseApiUrl,
        prepareHeaders: (headers, {}) => {
            headers.set("Authorization", `Bearer ${config.accessToken}`);
            return headers;
        },
    }),
    tagTypes: ['User'], // Add cache tags for better cache management
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => "",
            providesTags: ['User'],
        }),
        getUserById: builder.query<User, string>({
            query: () => ``,
            transformResponse: (response: User[], meta, id) => {
                const user = response.find(u => u.id === id);
                if (!user) throw new Error("User not found");
                cacheUser(id, user);
                return user;
            },
            async onCacheEntryAdded(id, { updateCachedData, cacheDataLoaded }) {
                const cached = getCachedUser(id);
                if (cached) {
                    updateCachedData(() => cached);
                }
                try {
                    await cacheDataLoaded;
                } catch (error) {
                    console.warn("Error loading user from server", error);
                }
            }
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery
} = userApi;