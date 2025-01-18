import { ORDERS_URL, PRODUCTS_URL } from "../constants";
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
  }),
});

export const {
    useCreateOrderMutation,
    useGetTranscationHistoryQuery
} = orderApiSlice;
