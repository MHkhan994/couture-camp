import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const UseSecureAxios = () => {

    const [logOut] = useContext(AuthContext)
    const navigate = useNavigate()

    const secureAxios = axios.create({ baseURL: 'http://localhost:5000' })


    useEffect(() => {
        secureAxios.interceptors.request.use((req) => {
            const token = localStorage.getItem('access-token')
            if (token) {
                req.headers.Authorization = `Bearer ${token}`
            }
            return req
        })

        secureAxios.interceptors.response.use((res) => {
            res, (error) => {
                if ((error.response && (error.response.status === 403 || error.response.status === 401))) {
                    logOut()
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        })
    }, [secureAxios, logOut, navigate])

    return [secureAxios]

};

export default UseSecureAxios;