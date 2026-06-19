import { indexSlice } from "./indexSlice";

export const applicationApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationById: builder.query({
      query: (id) => ({
        url: `/application/get-application/${id}`,
        method: "GET",
      }),
      providesTags: ["application"],
    }),
    getAllApplication: builder.query({
      query: ({ status = "", search = "" } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (search) params.append("search", search);
        const queryString = params.toString();
        return {
          url: `/application/get-all-application${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["application"],
    }),
    addApplication: builder.mutation({
      query: (data) => ({
        url: "/application/add-application",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["application"],
    }),
    updateApplication: builder.mutation({
      query: ({ id, data }) => ({
        url: `/application/update-application/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["application"],
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/application/delete-application/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["application"],
    }),
  }),
});

export const {
  useAddApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationByIdQuery,
  useGetAllApplicationQuery,
  useUpdateApplicationMutation,
} = applicationApi;
