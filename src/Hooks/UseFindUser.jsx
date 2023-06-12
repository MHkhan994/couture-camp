import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "./UseSecureAxios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const UseFindUser = () => {

    const { user, loading } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()

    const { data: DbUser = {} } = useQuery({
        queryKey: ['db-user'],
        enabled: !loading && user !== null,
        queryFn: async () => {
            const res = await secureAxios.get(`/user/${user.email}`)
            return res.data
        }
    })

    return { DbUser }
};

export default UseFindUser;