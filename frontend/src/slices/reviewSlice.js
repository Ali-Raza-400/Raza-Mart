import { REVIEW_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: `${REVIEW_URL}/all`,
        method: "GET",
      }),
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/add`,
        body: data,
        method: "POST",
      }),
    }),
    getReviewsByProductId: builder.query({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}`,
        method: "GET",
      }),
    }),
    // getProductByCategory: builder.query({
    //   query: (params) => ({
    //     url: `${REVIEW_URL}/product-by-cat/${params?.id}`,
    //     method: "GET",
    //   }),
    // }),

  }),
});

export const {
useAddReviewMutation,
useGetReviewsQuery,
useLazyGetReviewsByProductIdQuery,

} = productApiSlice;
