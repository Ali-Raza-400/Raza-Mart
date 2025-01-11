import { DASHBOARD } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // register: builder.mutation({
        //   query: (data) => ({
        //     url: `${USERS_URL}/register`,
        //     method: "POST",
        //     body: data,
        //   }),
        // }),

        getUserStats: builder.query({
            query: (type) => ({
                url: `${DASHBOARD}/user-stats?type=${type}`,
                method: "GET",
            }),
        }),
        getSaleStats: builder.query({
            query: (type) => ({
                url: `${DASHBOARD}/sale-stats?type=${type}`,
                method: "GET",
            }),
        }),

    }),
});

export const {
    useGetUserStatsQuery,
    useLazyGetUserStatsQuery,
    useLazyGetSaleStatsQuery
} = userApiSlice;
