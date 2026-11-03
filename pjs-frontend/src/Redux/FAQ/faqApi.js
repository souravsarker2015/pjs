import { apiSlice } from "../api/apiSlice";

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFAQ: builder.query({
      query: () => ({
        url: "/faq/all",
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    getSingleFAQ: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    addFAQ: builder.mutation({
      query: (data) => ({
        url: "/faq/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    updateFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    deleteFAQ: builder.mutation({
      query: (id) => ({
        url: `/faq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetAllFAQQuery,
  useGetSingleFAQQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
