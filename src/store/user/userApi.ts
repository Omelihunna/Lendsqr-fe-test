import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {config} from "../../config/config.ts";
import type {User} from "../../constants/constants.ts";

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
            query: () => "", // Assuming your endpoint is /users
            providesTags: ['User'], // Tag for cache invalidation
        }),
        getUserById: builder.query<User, string>({
            query: () => ``,
            transformResponse: (baseQueryReturnValue: any[], meta, arg: string) => {
                return baseQueryReturnValue.find(user => user.id === arg);
            },
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery
} = userApi;