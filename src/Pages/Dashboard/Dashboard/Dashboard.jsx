import { useContext } from "react";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";

import './Dashboard.css'

import { BiSelectMultiple } from 'react-icons/bi';
import { FaBars, FaBookOpen, FaHistory } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

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
        <div className="drawer lg:drawer-open bg-gray-100">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content py-12">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="lg:hidden absolute top-5 left-5">
                    <FaBars className="text-xl"></FaBars>
                </label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="das-nav bg-gradient-to-t from-[#0c98aa] to-[#06d497] lg:w-80 w-[60%] p-4 h-full space-y-4 capitalize text-white">
                    <label htmlFor="my-drawer-2" className="lg:hidden absolute top-5 right-5">
                        <IoMdClose className="text-3xl"></IoMdClose>
                    </label>
                    <div className="flex">
                        <img className="h-20 w-20 rounded-xl" src={user?.photoURL} alt="" />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center py-5 pb-10 border-b">
                        <img className="w-10" src="/logo.png" alt="" />
                        <h1 className="italic text-xl font-bold">CoutureCamp</h1>
                    </div>
                    <li><BiSelectMultiple /><NavLink to="/dashboard/selectedClasses">Selected Classes</NavLink></li>
                    <li><FaBookOpen></FaBookOpen><NavLink>Enrolled classes</NavLink></li>
                    <li><FaHistory></FaHistory><NavLink>Payment history</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;