import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "./UseSecureAxios";

const UseCart = () => {

    const [secureAxios] = UseSecureAxios()
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await secureAxios.get('/cart')
            return res.data
        }
    })

    return { cart, refetch }
};

export default UseCart;