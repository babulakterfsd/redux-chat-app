# Details

Date : 2023-01-19 12:08:23

Directory e:\\projects\\redux\\redux-chat-app

Total : 54 files,  1530 codes, 43 comments, 189 blanks, all 1762 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.env](/.env) | Properties | 3 | 0 | 0 | 3 |
| [README.md](/README.md) | Markdown | 3 | 0 | 3 | 6 |
| [index.html](/index.html) | HTML | 13 | 0 | 1 | 14 |
| [package.json](/package.json) | JSON | 65 | 0 | 1 | 66 |
| [postcss.config.cjs](/postcss.config.cjs) | JavaScript | 6 | 0 | 1 | 7 |
| [src/App.jsx](/src/App.jsx) | JavaScript React | 15 | 0 | 3 | 18 |
| [src/assets/images/blank.svg](/src/assets/images/blank.svg) | XML | 52 | 1 | 2 | 55 |
| [src/assets/images/logo.svg](/src/assets/images/logo.svg) | XML | 1 | 0 | 0 | 1 |
| [src/assets/images/lws-logo-dark.svg](/src/assets/images/lws-logo-dark.svg) | XML | 59 | 0 | 4 | 63 |
| [src/assets/images/lws-logo-light.svg](/src/assets/images/lws-logo-light.svg) | XML | 59 | 0 | 4 | 63 |
| [src/components/AllRoutes.jsx](/src/components/AllRoutes.jsx) | JavaScript React | 54 | 0 | 4 | 58 |
| [src/components/ErrorBoundry.jsx](/src/components/ErrorBoundry.jsx) | JavaScript React | 19 | 0 | 7 | 26 |
| [src/components/PrivateRoute.jsx](/src/components/PrivateRoute.jsx) | JavaScript React | 8 | 0 | 4 | 12 |
| [src/components/PublicRoute.jsx](/src/components/PublicRoute.jsx) | JavaScript React | 8 | 0 | 4 | 12 |
| [src/components/inbox/Blank.jsx](/src/components/inbox/Blank.jsx) | JavaScript React | 9 | 0 | 2 | 11 |
| [src/components/inbox/ChatIItems.jsx](/src/components/inbox/ChatIItems.jsx) | JavaScript React | 49 | 1 | 9 | 59 |
| [src/components/inbox/ChatItem.jsx](/src/components/inbox/ChatItem.jsx) | JavaScript React | 17 | 0 | 1 | 18 |
| [src/components/inbox/Modal.jsx](/src/components/inbox/Modal.jsx) | JavaScript React | 154 | 5 | 14 | 173 |
| [src/components/inbox/Navigation.jsx](/src/components/inbox/Navigation.jsx) | JavaScript React | 29 | 1 | 4 | 34 |
| [src/components/inbox/Sidebar.jsx](/src/components/inbox/Sidebar.jsx) | JavaScript React | 38 | 2 | 4 | 44 |
| [src/components/inbox/chatbody/Blank.jsx](/src/components/inbox/chatbody/Blank.jsx) | JavaScript React | 13 | 0 | 2 | 15 |
| [src/components/inbox/chatbody/ChatBody.jsx](/src/components/inbox/chatbody/ChatBody.jsx) | JavaScript React | 40 | 3 | 8 | 51 |
| [src/components/inbox/chatbody/ChatHead.jsx](/src/components/inbox/chatbody/ChatHead.jsx) | JavaScript React | 20 | 0 | 3 | 23 |
| [src/components/inbox/chatbody/Message.jsx](/src/components/inbox/chatbody/Message.jsx) | JavaScript React | 9 | 0 | 1 | 10 |
| [src/components/inbox/chatbody/Messages.jsx](/src/components/inbox/chatbody/Messages.jsx) | JavaScript React | 25 | 0 | 4 | 29 |
| [src/components/inbox/chatbody/Options.jsx](/src/components/inbox/chatbody/Options.jsx) | JavaScript React | 55 | 0 | 5 | 60 |
| [src/components/ui/Error.jsx](/src/components/ui/Error.jsx) | JavaScript React | 9 | 0 | 1 | 10 |
| [src/hooks/useAuth.js](/src/hooks/useAuth.js) | JavaScript | 9 | 0 | 3 | 12 |
| [src/hooks/useAuthCheck.js](/src/hooks/useAuthCheck.js) | JavaScript | 23 | 0 | 4 | 27 |
| [src/main.jsx](/src/main.jsx) | JavaScript React | 12 | 0 | 2 | 14 |
| [src/rtk/features/api/apiSlice.js](/src/rtk/features/api/apiSlice.js) | JavaScript | 17 | 2 | 2 | 21 |
| [src/rtk/features/auth/authAPI.js](/src/rtk/features/auth/authAPI.js) | JavaScript | 59 | 10 | 7 | 76 |
| [src/rtk/features/auth/authSlice.js](/src/rtk/features/auth/authSlice.js) | JavaScript | 21 | 1 | 4 | 26 |
| [src/rtk/features/conversations/conversationsAPI.js](/src/rtk/features/conversations/conversationsAPI.js) | JavaScript | 91 | 8 | 5 | 104 |
| [src/rtk/features/conversations/conversationsSlice.js](/src/rtk/features/conversations/conversationsSlice.js) | JavaScript | 9 | 1 | 4 | 14 |
| [src/rtk/features/messages/messagesAPI.js](/src/rtk/features/messages/messagesAPI.js) | JavaScript | 17 | 0 | 3 | 20 |
| [src/rtk/features/messages/messagesSlice.js](/src/rtk/features/messages/messagesSlice.js) | JavaScript | 9 | 1 | 4 | 14 |
| [src/rtk/features/users/usersAPI.js](/src/rtk/features/users/usersAPI.js) | JavaScript | 9 | 0 | 3 | 12 |
| [src/rtk/middlewares/myMiddleware.js](/src/rtk/middlewares/myMiddleware.js) | JavaScript | 4 | 0 | 2 | 6 |
| [src/rtk/store/store.js](/src/rtk/store/store.js) | JavaScript | 16 | 0 | 3 | 19 |
| [src/styles/App.css](/src/styles/App.css) | PostCSS | 8 | 0 | 1 | 9 |
| [src/styles/index.css](/src/styles/index.css) | PostCSS | 3 | 0 | 1 | 4 |
| [src/utils/axios.js](/src/utils/axios.js) | JavaScript | 5 | 0 | 3 | 8 |
| [src/utils/getPartnerInfo.js](/src/utils/getPartnerInfo.js) | JavaScript | 3 | 0 | 2 | 5 |
| [src/utils/isValidEmail.js](/src/utils/isValidEmail.js) | JavaScript | 7 | 0 | 1 | 8 |
| [src/utils/learnDebounce.js](/src/utils/learnDebounce.js) | JavaScript | 14 | 2 | 3 | 19 |
| [src/views/Conversation.jsx](/src/views/Conversation.jsx) | JavaScript React | 20 | 0 | 2 | 22 |
| [src/views/Home.jsx](/src/views/Home.jsx) | JavaScript React | 4 | 0 | 2 | 6 |
| [src/views/Inbox.jsx](/src/views/Inbox.jsx) | JavaScript React | 16 | 0 | 2 | 18 |
| [src/views/Login.jsx](/src/views/Login.jsx) | JavaScript React | 109 | 1 | 9 | 119 |
| [src/views/NotFound.jsx](/src/views/NotFound.jsx) | JavaScript React | 9 | 0 | 3 | 12 |
| [src/views/Register.jsx](/src/views/Register.jsx) | JavaScript React | 180 | 2 | 13 | 195 |
| [tailwind.config.cjs](/tailwind.config.cjs) | JavaScript | 19 | 1 | 3 | 23 |
| [vite.config.js](/vite.config.js) | JavaScript | 5 | 1 | 2 | 8 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)