import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/Auth/auth.selector"; 

export const PrivateRoute = () => {
    const token = useSelector(selectToken);

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};
