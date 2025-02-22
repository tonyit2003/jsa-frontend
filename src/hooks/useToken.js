const { useSyncExternalStore } = require("react");
const useToken = () => {
    return useSyncExternalStore(
        (callback) => {
            window.addEventListener("storage", callback);
            return () => window.removeEventListener("storage", callback);
        },
        () => localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY),
        () => localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY)
    );
};

export default useToken;
