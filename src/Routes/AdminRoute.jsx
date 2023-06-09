import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseFindRole from "../Hooks/UseFindRole";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const { role, roleLoading } = UseFindRole()
    const location = useLocation()

    console.log(loading, roleLoading);

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    else if (user && role === 'admin') {
        return children
    }

    else if (user && role !== 'admin') {
        return <Navigate to='/'></Navigate>
    }

    return <Navigate state={{ from: location }} to='/login'></Navigate>
};

export default AdminRoute;