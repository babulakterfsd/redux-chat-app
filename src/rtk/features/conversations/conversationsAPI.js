/* eslint-disable eqeqeq */
import io from 'socket.io-client';
import { apiSlice } from '../api/apiSlice';
import { messagesApi } from '../messages/messagesAPI';

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (email) =>
                `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=10`,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io('http://localhost:9000', {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ['websocket'],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                    withCredentials: true,
                });

                try {
                    await cacheDataLoaded;
                    // updating cache after editing a conversations
                    socket.on('conversationEdited', async (data) => {
                        await updateCachedData((draft) => {
                            const conversation = draft.data.find((c) => c.id == data?.data?.id);

                            if (conversation?.id) {
                                conversation.message = data?.data?.message;
                                conversation.timestamp = data?.data?.timestamp;
                            } else {
                                // do nothing
                            }
                        });
                    });
                    // updating cache after adding a conversations
                    socket.on('conversationAdded', async (data) => {
                        await updateCachedData((draft) => {
                            console.log(JSON.stringify(draft));
                            if (data?.data.participants.includes(arg)) {
                                draft?.data?.unshift(data.data);
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
        getConversation: builder.query({
            query: ({ userEmail, participantEmail }) =>
                `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
        }),
        addConversation: builder.mutation({
            query: ({ sender, data }) => ({
                url: '/conversations',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const conversation = await queryFulfilled;

                    // we don't need to update the cache here because we are updating the cache on socket event so if we do the update here then it will be double conversations in the ui

                    // silent entry to the message
                    if (conversation?.data?.id) {
                        // silent entry to message table
                        const { users } = arg.data;
                        const senderUser = users.find((user) => user.email === arg.sender);
                        const receiverUser = users.find((user) => user.email !== arg.sender);

                        await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        editConversation: builder.mutation({
            query: ({ id, data, sender }) => ({
                url: `/conversations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // cache update here is unnecessary because we are updating cache when listening to the socket

                // unnecessary code
                // optimistic cache update start
                // const pathResult = await dispatch(
                //   apiSlice.util.updateQueryData(
                //     "getConversations",
                //     arg.sender,
                //     (draft) => {
                //       // eslint-disable-next-line eqeqeq
                //       const draftConversation = draft.data.find((c) => c.id == arg.id);
                //       draftConversation.message = arg.data.message;
                //       draftConversation.timestamp = arg.data.timestamp;
                //     }
                //   )
                // );
                // // optimistic cache update end

                try {
                    const conversation = await queryFulfilled;
                    if (conversation?.data?.id) {
                        // silent entry to message table
                        const { users } = arg.data;
                        const senderUser = users.find((user) => user.email === arg.sender);
                        const receiverUser = users.find((user) => user.email !== arg.sender);

                        await dispatch(
                            messagesApi.endpoints.addMessage.initiate({
                                conversationId: conversation?.data?.id,
                                sender: senderUser,
                                receiver: receiverUser,
                                message: arg.data.message,
                                timestamp: arg.data.timestamp,
                            })
                        );

                        // cache update here is unnecessary because we are updating cache when listening to the socket

                        // unnecessary code
                        // update messages cache pessimistically start
                        // await dispatch(
                        //   apiSlice.util.updateQueryData(
                        //     "getMessages",
                        //     res.conversationId.toString(),
                        //     (draft) => {
                        //       draft.data.push(res);
                        //     }
                        //   )
                        // );
                        // update messages cache pessimistically end
                    }
                } catch (err) {
                    console.log(err);
                    // pathResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation,
    useEditConversationMutation,
} = conversationsApi;
