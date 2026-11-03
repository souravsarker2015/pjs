import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),

  tagTypes: [
    "banner",
    "team",
    "logo",
    "contact",
    "highlightProject",
    "whychooseSection",
    "about",
    "ContactMsgs",
    "category",
    "subCategory",
    "subSubCategory",
    "admin",
    "user",
    "themes",
    "favicon",
    "whychoose",
    "gallery",
    "businessInfo",
    "seo",
    "projects",
    "privacy",
  ],
});
