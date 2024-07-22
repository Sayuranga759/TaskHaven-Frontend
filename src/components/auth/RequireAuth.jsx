import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import * as EndPoints from "../../constants/end_points";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth
            ? <Outlet /> 
            : <Navigate to={EndPoints.ROUTE_ENDPOINTS.USER_HOMEPAGE} state={{from: location}} replace />;
};

export default RequireAuth;