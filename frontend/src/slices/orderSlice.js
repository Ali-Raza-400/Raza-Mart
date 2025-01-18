import { ORDERS_URL, PRODUCTS_URL, WHISHLIST } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
        query: (product) => ({
          url: `${ORDERS_URL}/pay`,
          method: 'POST',
          body: product,
        }),
      }),
    getTranscationHistory: builder.query({
        query: (product) => ({
          url: `${ORDERS_URL}/transction-hostory`,
          method: 'GET',
          body: product,
        }),
      }),

      getWhishlist: builder.query({
        query: (userId) => ({
          url: `${WHISHLIST}/getall/:${userId}`,
          method: 'GET',
          // body: payload,
        }),
      }),
      addWhishlist: builder.mutation({
        query: (payload) => ({
          url: `${WHISHLIST}/add`,
          method: 'POST',
          body: payload,
        }),
      }),
  }),
});

export const {
    useCreateOrderMutation,
    useGetTranscationHistoryQuery,
    useGetWhishlistQuery,
    useAddWhishlistMutation
} = orderApiSlice;
