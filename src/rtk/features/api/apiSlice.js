import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:9000`,
        // baseUrl: process.env.REACT_APP_API,
    }),
    tagTypes: [],
    endpoints: (builder) => ({
        // endpoints
    }),
});
