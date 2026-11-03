import { apiSlice } from "./api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (query) => ({
        url: "/team/all",
        params: query,
      }),
      providesTags: ["team"],
    }),

    getSingleTeam: builder.query({
      query: (id) => ({
        url: `/team/${id}`,
      }),
      providesTags: ["team"],
    }),

    addTeam: builder.mutation({
      query: (formData) => ({
        url: `/team/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["team"],
    }),

    editTeam: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/team/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["team"],
    }),

    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/team/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["team"],
    }),
  }),
});

export const {
  useAddTeamMutation,
  useGetTeamsQuery,
  useGetSingleTeamQuery,
  useEditTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
