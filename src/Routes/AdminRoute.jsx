import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseFindRole from "../Hooks/UseFindRole";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const { role, roleLoading } = UseFindRole()


    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    else if (user && role === 'admin') {
        return children
    }

    else if (user && role !== 'admin') {
        return <Navigate to='/'></Navigate>
    }

    return <Navigate to='/'></Navigate>
};

export default AdminRoute;