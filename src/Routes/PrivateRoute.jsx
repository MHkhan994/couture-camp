import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children
    }

    <Navigate to='/login'></Navigate>
};

export default PrivateRoute;