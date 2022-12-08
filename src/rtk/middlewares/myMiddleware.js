const myMiddleware = (store) => (next) => (action) => {
    next(action);
};

export default myMiddleware;
