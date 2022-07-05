import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:4567/'
    }),
    endpoints: (builder) => ({
      ddlQuery: builder.mutation({
        query: (args) => ({
          url: 'ddl',
          method: 'POST',
          body: args,
        }),
      }),
      dmlQuery: builder.mutation({
        query: (args) => ({
          url: 'dml',
          method: 'POST',
          body: args,
        }),
      }),
    })
});

export const { 
    useDdlQueryMutation, 
    useDmlQueryMutation
  } = apiSlice;