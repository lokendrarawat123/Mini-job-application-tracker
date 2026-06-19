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
      query: () => ({
        url: "/application/get-all-application",
        method: "GET",
      }),
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
    // Update Staff
    updateApplication: builder.mutation({
      query: ({ id, data }) => ({
        url: `/application/update-application/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["application"],
    }),
    // Delete Staff
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
