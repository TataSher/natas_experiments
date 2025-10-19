import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // not used in test
  endpoints: (builder) => ({
    getPosts: builder.query<{ id: number; title: string }[], void>({
      query: () => "posts",
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
