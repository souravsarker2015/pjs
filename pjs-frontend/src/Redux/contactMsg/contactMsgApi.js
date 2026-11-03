import { apiSlice } from "../api/apiSlice";

export const contactMsgApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactMsgs: builder.query({
      query: () => ({
        url: "/contactMsg",
        method: "GET",
      }),
      providesTags: ["contactMsgs"],
    }),

    getContactMsgById: builder.query({
      query: (id) => ({
        url: `/contactMsg/${id}`,
        method: "GET",
      }),
      providesTags: ["contactMsgs"],
    }),

    addContactMsg: builder.mutation({
      query: (newMessage) => ({
        url: "/contactMsg/add",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["contactMsgs"],
    }),

    deleteContactMsg: builder.mutation({
      query: (id) => ({
        url: `/contactMsg/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contactMsgs"],
    }),
  }),
});

export const {
  useGetAllContactMsgsQuery,
  useGetContactMsgByIdQuery,
  useAddContactMsgMutation,
  useDeleteContactMsgMutation,
} = contactMsgApi;
