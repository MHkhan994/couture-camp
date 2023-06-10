import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }}></Navigate>
};

export default PrivateRoute;