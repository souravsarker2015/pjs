import { apiSlice } from "../api/apiSlice";

export const aboutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({
        url: "/about",
      }),
      providesTags: ["about"],
    }),

    createAboutUs: builder.mutation({
      query: (formData) => ({
        url: `/about/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["about"],
    }),

    updateAboutUs: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/about/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
} = aboutApi;
