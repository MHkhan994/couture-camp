import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProvider";
import UseSecureAxios from "./UseSecureAxios";

const UseisPaid = (email) => {
    const { user, loading } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()

    const { data: paidClasses = [] } = useQuery({
        queryKey: ['is-paid'],
        enabled: !loading && user !== null,
        queryFn: async () => {
            const res = await secureAxios.get(`/payment/user/classes/${email}`)
            return res.data
        }
    })

    return { paidClasses }

};

export default UseisPaid;