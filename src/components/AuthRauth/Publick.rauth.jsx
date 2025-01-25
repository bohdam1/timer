
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/Auth/auth.selector"; 

export const PublickeRoute = () => {
    const token = useSelector(selectToken);

    return token ? <Navigate to="/login" replace /> :<Outlet /> ;
    
};

