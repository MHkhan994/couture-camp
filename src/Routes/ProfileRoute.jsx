import { useContext } from "react";
import UseFindRole from "../Hooks/UseFindRole";
import { AuthContext } from "../Providers/AuthProvider";
import StudentRoute from "./StudentRoute";
import StudentProfile from "../Pages/Dashboard/StudentProfile/StudentProfile";
import LoadingSpinner from "../Components/LoadingSpinner";
import InstructorRoute from "./InstructorRoute";
import InstructorProfile from "../Pages/Dashboard/InstructorProfile/InstructorProfile";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile,";

const ProfileRoute = () => {
    const { user, loading } = useContext(AuthContext)
    const { role, roleLoading } = UseFindRole()

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && role === 'student') {
        return (
            <StudentRoute><StudentProfile></StudentProfile></StudentRoute>
        );
    }

    if (user && role === 'instructor') {
        return (
            <InstructorRoute><InstructorProfile></InstructorProfile></InstructorRoute>
        );
    }

    if (user && role === 'admin') {
        return (
            <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
        );
    }

};

export default ProfileRoute;