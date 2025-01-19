import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({keyword,pageNumber}) => ({
        url: `${PRODUCTS_URL}/all`,
        method: "GET",
        params: { keyword ,pageNumber},
      }),
    }),
    getSingleProducts: builder.query({
      query: (params) => ({
        url: `${PRODUCTS_URL}/single/${params?.id}`,
        method: "GET",
      }),
    }),
    getProductByCategory: builder.query({
      query: (params) => ({
        url: `${PRODUCTS_URL}/product-by-cat/${params?.id}`,
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
  useLazyGetSingleProductsQuery,
  useLazyGetProductByCategoryQuery
//   useLoginMutation,
//   useLogoutMutation,
//   useGetProfileQuery,
//   useUpdateUserProfileMutation,
} = productApiSlice;
