import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/register`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // login: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/login`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // logout: builder.mutation({
    //   query: () => ({
    //     url: `${USERS_URL}/logout`,
    //     method: "POST",
    //   }),
    // }),
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/all`,
        method: "GET",
      }),
    }),
    // updateUserProfile: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useLazyGetProductsQuery,
//   useLoginMutation,
//   useLogoutMutation,
//   useGetProfileQuery,
//   useUpdateUserProfileMutation,
} = productApiSlice;
