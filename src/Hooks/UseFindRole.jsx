import { useContext } from "react";
import UseSecureAxios from "./UseSecureAxios";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const UseFindRole = () => {

    const [secureAxios] = UseSecureAxios()
    const { user, loading } = useContext(AuthContext)

    const { data: role = '', isLoading: roleLoading } = useQuery({
        queryKey: ['user-role', user, secureAxios],
        enabled: !loading,
        queryFn: async () => {
            const res = await secureAxios(`/users/role/${user.email}`)
            return res.data.role
        }
    })

    return { role, roleLoading }
};

export default UseFindRole;