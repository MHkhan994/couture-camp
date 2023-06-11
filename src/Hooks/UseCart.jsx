import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "./UseSecureAxios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const UseCart = () => {

    const { user, loading } = useContext(AuthContext)

    const [secureAxios] = UseSecureAxios()
    const { data: cart = [], refetch, isLoading: cartLoading } = useQuery({
        queryKey: ['cart', user],
        enabled: !loading && user !== null,
        queryFn: async () => {
            const res = await secureAxios.get(`/cart?email=${user?.email}`)
            return res.data
        }
    })

    return { cart, refetch, cartLoading }
};

export default UseCart;