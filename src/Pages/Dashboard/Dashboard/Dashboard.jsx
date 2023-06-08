import { useContext } from "react";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

import './Dashboard.css'

import { BiSelectMultiple } from 'react-icons/bi';
import { FaBookOpen, FaHistory } from "react-icons/fa";

const Dashboard = () => {

    const { user, loading } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()

    const { data: role = '' } = useQuery({
        queryKey: ['user-role', user, secureAxios],
        enabled: !loading,
        queryFn: async () => {
            const res = await secureAxios(`/users/role/${user.email}`)
            return res.data.role
        }
    })

    console.log(role);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="das-nav bg-[#06d497] w-80 p-4 h-full space-y-4 m-2 rounded-md capitalize text-white">
                    <div className="flex items-center py-5 pb-10">
                        <img className="w-10" src="logo.png" alt="" />
                        <h1 className="italic text-3xl font-bold">CoutureCamp</h1>
                    </div>
                    <li><BiSelectMultiple /><NavLink>Selected Classes</NavLink></li>
                    <li><FaBookOpen></FaBookOpen><NavLink>Enrolled classes</NavLink></li>
                    <li><FaHistory></FaHistory><NavLink>Payment history</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;