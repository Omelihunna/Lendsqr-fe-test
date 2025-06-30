import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {config} from "../../config/config.ts";

console.log(config.accessToken)

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: config.baseApiUrl,
        prepareHeaders: (headers, {}) => {
            headers.set("Authorization", `Bearer ${config.accessToken}`)
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<any[], void>({
            query: () => "",
        }),
    }),
});

export const {useGetUsersQuery} = userApi;
