import { createContext, useEffect, useState } from "react";
import { getUserByToken } from "~/services/UserService";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({
        isAuth: false,
        token: "",
        full_name: "",
        email: "",
        phone_number: "",
        user_type: "",
    });

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const token = localStorage.getItem(
            process.env.REACT_APP_AUTH_TOKEN_KEY
        );
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await getUserByToken(token);
            if (res.user && res.status === "success") {
                setAuth({
                    isAuth: true,
                    token,
                    full_name: res.user.full_name,
                    email: res.user.email,
                    phone_number: res.user.phone_number,
                    user_type: res.user.user_type,
                });
            }
        } catch (error) {
            setAuth({
                isAuth: false,
                token: "",
                full_name: "",
                email: "",
                phone_number: "",
                user_type: "",
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loader-overlay">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <UserContext.Provider value={{ auth, setAuth }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
