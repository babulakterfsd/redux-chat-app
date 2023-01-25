/* eslint-disable no-empty */
/* eslint-disable eqeqeq */
import { io } from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=15`,
            transformResponse(apiResponse, meta) {
                const totalCount = meta.response.headers.get('X-Total-Count');
                return {
                    data: apiResponse,
                    totalCount,
                };
            },
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io(`https://chat-app-server-agio.onrender.com`, {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ['websocket'],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;
                    socket.on('message', (data) => {
                        const isConversationIdValid = data.data.conversationId == arg;
                        updateCachedData((draft) => {
                            // pessimistic update for messages through socket when new message is added to conversations
                            if (isConversationIdValid) {
                                draft.data.push(data.data);
                            }
                        });
                    });
                } catch (err) {}

                await cacheEntryRemoved;
                socket.close();
            },
        }),
        getMoreMessages: builder.query({
            query: ({ id, page }) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=15`,
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.length > 0) {
                        // update conversation cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                'getMessages',
                                arg.id.toString(),
                                (draft) => ({
                                    data: [...draft.data, ...result.data],
                                    totalCount: Number(draft.totalCount),
                                })
                            )
                        );
                        // update messages cache pessimistically end
                    }
                } catch (err) {}
            },
        }),
        addMessage: builder.mutation({
            query: (data) => ({
                url: '/messages',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
