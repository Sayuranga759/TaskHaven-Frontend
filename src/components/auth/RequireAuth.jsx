import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import * as EndPoints from "../../constants/end_points";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.AccessToken
            ? <Outlet /> 
            : <Navigate to={EndPoints.ROUTE_ENDPOINTS.home} state={{from: location}} replace />;
};

export default RequireAuth;