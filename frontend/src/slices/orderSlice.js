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
  }),
});

export const {
    useCreateOrderMutation
} = orderApiSlice;
