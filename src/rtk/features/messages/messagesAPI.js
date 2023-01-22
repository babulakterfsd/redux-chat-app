/* eslint-disable eqeqeq */
import io from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=10`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io(`http://localhost:9000`, {
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
                        console.log(data);
                        const isConversationIdValid = data.data.conversationId == arg;
                        updateCachedData((draft) => {
                            // pessimistic update for messages through socket when new message is added to conversations
                            if (isConversationIdValid) {
                                draft.push(data.data);
                            }
                        });
                    });
                } catch (err) {
                    // do nothing
                }

                await cacheEntryRemoved;
                socket.close();
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
