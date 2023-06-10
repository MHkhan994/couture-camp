import { NavLink, Outlet } from "react-router-dom";

import './Dashboard.css'

import { BiSelectMultiple } from 'react-icons/bi';
import { GiNotebook } from 'react-icons/gi'
import { FaBars, FaBook, FaBookOpen, FaHistory, FaHome } from "react-icons/fa";
import { MdOutlinePersonalInjury } from 'react-icons/md'
import { IoMdClose } from "react-icons/io";
import UseFindRole from "../../../Hooks/UseFindRole";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const { role } = UseFindRole()

    console.log(role);

    return (
        <div className="drawer lg:drawer-open bg-gray-100 min-h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content py-12">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="lg:hidden absolute top-5 left-5">
                    <FaBars className="text-xl"></FaBars>
                </label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="das-nav bg-gradient-to-t from-[#0c98aa] to-[#06d497] lg:w-72 w-[60%] p-4 h-full flex flex-col  gap-4 capitalize text-white">
                    <label htmlFor="my-drawer-2" className="lg:hidden absolute top-5 right-5">
                        <IoMdClose className="text-3xl"></IoMdClose>
                    </label>
                    <div className="flex">
                        <img className="h-20 w-20 rounded-xl" src={user?.photoURL} alt="" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-1 items-center py-5 pb-10 border-b">
                        <img className="w-10" src="/logo.png" alt="" />
                        <h1 className="italic text-xl font-bold">CoutureCamp</h1>
                    </div>

                    {
                        role === 'student' && <>
                            <li><BiSelectMultiple /><NavLink className={({ isActive }) => isActive ? 'ps-3 text-black' : ''} to="/dashboard/selectedClasses">Selected Classes</NavLink></li>
                            <li><FaBookOpen></FaBookOpen><NavLink className={({ isActive }) => isActive ? 'ps-3 text-black' : ''} to='/dashboard/enrolledClasses'>Enrolled classes</NavLink></li>
                            <li><FaHistory></FaHistory><NavLink>Payment history</NavLink></li>
                        </>
                    }

                    {
                        role === 'instructor' && <>
                            <li><FaBookOpen></FaBookOpen><NavLink className={({ isActive }) => isActive ? 'ps-3 text-black' : ''} to='/dashboard/myClasses'>My classes</NavLink></li>
                            <li><GiNotebook></GiNotebook><NavLink className={({ isActive }) => isActive ? 'ps-3 text-black' : ''} to='/dashboard/addClass'>Add class</NavLink></li>
                        </>
                    }

                    {
                        role === 'admin' && <>
                            <li><BiSelectMultiple /><NavLink className={({ isActive }) => isActive ? 'ps-3 text-black' : ''} to="/dashboard/manageClasses">Manage Classes</NavLink></li>
                            <li><FaBookOpen></FaBookOpen><NavLink className={({ isActive }) => isActive ? 'ps-3 text-black' : ''} to='/dashboard/manageUsers'>Manage Users</NavLink></li>
                        </>
                    }

                    <br />
                    <br />
                    <li><FaHome></FaHome><NavLink to='/'>Home</NavLink></li>
                    <li><FaBook></FaBook><NavLink to='/classes'>Classes</NavLink></li>
                    <li><MdOutlinePersonalInjury></MdOutlinePersonalInjury><NavLink to='/instructors'>Instructors</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;