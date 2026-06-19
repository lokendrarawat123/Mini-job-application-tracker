import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_DEV_BACKEND_URL,
  credentials: "include",
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};
export const indexSlice = createApi({
  baseQuery,
  tagTypes: ["applicaton"],
  endpoints: () => ({}),
});
