import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [ tokenData, setTokenData]  = useState(null);

    useEffect(() => {
        if (auth?.AccessToken) {
            const tokenData = jwtDecode(auth.AccessToken);
            setTokenData(tokenData);
        }
    }, [auth]);

    return { auth, setAuth, tokenData };
};

export default useAuth;