import { useEffect } from "react";
import  { axiosWithAuth }from "../services/apiBase";
import useAuth from "./useAuth"

const useAxiosWithAuth = () => {

    const { auth } = useAuth();

    useEffect(() => {

        const requestInterceptor = axiosWithAuth.interceptors.request.use(
            (config) => {
                if (auth) {
                    config.headers.Authorization = `Bearer ${auth}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosWithAuth.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 400) {
                    console.log(error)
                    // Implement a logout function or refresh token logic
                    // logout();
                }
                return Promise.reject(error);
            }
        );
        
        return () => {
            axiosWithAuth.interceptors.request.eject(requestInterceptor);
            axiosWithAuth.interceptors.response.eject(responseInterceptor);
        };
    }, [auth]);

    return axiosWithAuth;
}

export default useAxiosWithAuth;
