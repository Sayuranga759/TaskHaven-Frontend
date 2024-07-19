import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import * as EndPoints from "../constants/end_points";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate(EndPoints.ROUTE_ENDPOINTS.LOGIN);
  };

  return logout;
};

export default useLogout;