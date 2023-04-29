import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({allowedRole}) => {
    const user = useSelector((state) => state.user?.user)
    const location = useLocation();

    return(
        allowedRole.find(role => role.includes(user?.role))
        ? <Outlet/>
        : user
        ? <Navigate to="/unauthorized" state={{from: location}} replace />
        : <Navigate to="/login" state={{from: location}} replace />
    );
}

export default RequireAuth;