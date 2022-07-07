import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:4567/'
    }),
    tagTypes: ['Realities'],
    endpoints: (builder) => ({
      ddlQuery: builder.mutation({
        query: (args) => ({
          url: 'ddl',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: ['Realities']
      }),
      dmlQuery: builder.mutation({
        query: (args) => ({
          url: 'dml',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: ['Realities']
      }),
      fetchLattices: builder.query({
        query: () => ({
          url: 'dml',
          method: 'POST',
          body: 'SELECT * FROM public.admin_lattice',
        }),
        transformResponse: (response) => {
          var lattices = {};
          response.result.forEach(node => {
            const lattice_name = node['lattice_name'];
            const parent_label = node['parent_label'];
            const child_label = node['child_label'];
            !(lattice_name in lattices) && (lattices[lattice_name] = {})
            !(parent_label in lattices[lattice_name]) && (lattices[lattice_name][parent_label] = [])
            lattices[lattice_name][parent_label].push(child_label);
          });
          console.log(lattices);
          return lattices;
        },
        providesTags: ['Realities']
      }),
    })
});

export const { 
    useDdlQueryMutation, 
    useDmlQueryMutation,

    useFetchLatticesQuery,
  } = apiSlice;