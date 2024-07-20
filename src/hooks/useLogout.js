import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import Cookies from "js-cookie";
import * as EndPoints from "../constants/end_points";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    Cookies.remove("auth");
    navigate(EndPoints.ROUTE_ENDPOINTS.LOGIN);
  };

  return logout;
};

export default useLogout;