import { NavLink, Outlet } from "react-router-dom";

import './Dashboard.css'

import { BiSelectMultiple } from 'react-icons/bi';
import { GiNotebook } from 'react-icons/gi'
import { FaBars, FaBook, FaBookOpen, FaHistory, FaHome } from "react-icons/fa";
import { MdOutlinePersonalInjury } from 'react-icons/md'
import { IoMdClose } from "react-icons/io";
import UseFindRole from "../../../Hooks/UseFindRole";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import HelmetTitle from "../../../Components/HelmetTitle";

const Dashboard = () => {
    const { user, isNight, setIsNight } = useContext(AuthContext)
    const { role } = UseFindRole()

    useEffect(() => {
        const localTheme = localStorage.getItem('couture-theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
        if (localTheme === 'night') {
            setIsNight(true)
        }
        else {
            setIsNight(false)
        }
        // navigate('/dashboard/profile')
    }, [setIsNight])


    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <HelmetTitle title='Dashboard'></HelmetTitle>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content py-12">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="lg:hidden absolute top-5 left-5">
                    <FaBars className="text-xl"></FaBars>
                </label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className={isNight ? "das-nav border shadow-md lg:w-72 w-[60%] bg-slate-900 p-4 h-full flex flex-col  gap-4 capitalize" : "das-nav border shadow-md lg:w-72 w-[60%] bg-white p-4 h-full flex flex-col  gap-4 capitalize"}>
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
                            <li><FaHome /><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to="/dashboard/profile">Profile</NavLink></li>
                            <li><BiSelectMultiple /><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to="/dashboard/selectedClasses">Selected Classes</NavLink></li>
                            <li><FaBookOpen></FaBookOpen><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to='/dashboard/enrolledClasses'>Enrolled classes</NavLink></li>
                            <li><FaHistory></FaHistory><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to='/dashboard/paymentHistory'>Payment history</NavLink></li>
                        </>
                    }

                    {
                        role === 'instructor' && <>
                            <li><FaHome /><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to="/dashboard/profile">Profile</NavLink></li>
                            <li><FaBookOpen></FaBookOpen><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to='/dashboard/myClasses'>My classes</NavLink></li>
                            <li><GiNotebook></GiNotebook><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to='/dashboard/addClass'>Add class</NavLink></li>
                        </>
                    }

                    {
                        role === 'admin' && <>
                            <li><FaHome /><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to="/dashboard/profile">Profile</NavLink></li>
                            <li><BiSelectMultiple /><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to="/dashboard/manageClasses">Manage Classes</NavLink></li>
                            <li><FaBookOpen></FaBookOpen><NavLink className={({ isActive }) => isActive ? 'ps-3 text-[#03e9a4]' : ''} to='/dashboard/manageUsers'>Manage Users</NavLink></li>
                        </>
                    }

                    <br />
                    <hr />
                    <li><FaHome></FaHome><NavLink className='' to='/'>Home</NavLink></li>
                    <li><FaBook></FaBook><NavLink className='' to='/classes'>Classes</NavLink></li>
                    <li><MdOutlinePersonalInjury></MdOutlinePersonalInjury><NavLink className='' to='/instructors'>Instructors</NavLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;