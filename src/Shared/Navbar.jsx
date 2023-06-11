import { Link, NavLink } from "react-router-dom";
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import { IoMdClose, IoMdNotifications } from 'react-icons/io'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseCart from "../Hooks/UseCart";
import UseFindRole from "../Hooks/UseFindRole";

const Navbar = () => {

    const { user, logOut, toggleTheme, isNight, setIsNight } = useContext(AuthContext)
    const { role } = UseFindRole()
    const [isOpen, setIsOpen] = useState(false)
    const { cart } = UseCart()
    const [theme, setTheme] = useState(localStorage.getItem('couture-theme') ? localStorage.getItem('couture-theme') : 'light')

    useEffect(() => {
        localStorage.setItem('couture-theme', theme)
        const localTheme = localStorage.getItem('couture-theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
        if (localTheme === 'night') {
            setIsNight(true)
        }
        else {
            setIsNight(false)
        }
    }, [theme, setIsNight])

    const handleTheme = (e) => {
        if (theme === 'night') {
            setTheme('light')
            setIsNight(false)
        }
        else {
            setTheme('night')
            setIsNight(true)
        }
    }

    const handleLogout = () => {
        logOut()
        localStorage.removeItem('access-token')
        setIsOpen(false)
    }

    const handleToggle = () => {
        toggleTheme()
        setIsOpen(false)
    }

    console.log(isNight);

    return (
        <div className={!isNight ? "bg-[#ffffff5e] fixed w-full backdrop-blur-sm z-10 shadow-md" : "bg-[#00000056] fixed w-full backdrop-blur-sm z-10 shadow-md"}>
            <div className=" my-container lg:flex justify-between hidden py-5">
                <div className="flex items-center">
                    <img className="w-10 object-cover" src="logo.png" alt="" />
                    <h1 className="italic text-3xl font-bold">CoutureCamp</h1>
                </div>
                <ul className="flex gap-5 items-center text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/'>Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/classes'>Classes</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/instructors'>Instructors</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/dashboard'>Dashboard</NavLink>
                    {
                        role === 'student' &&
                        <NavLink className='relative me-2' to='/dashboard/selectedClasses'>
                            <p className="absolute -right-4 -top-3 text-[#03e9a4]">{cart?.length || 0}</p>
                            <FaShoppingCart className="text-xl">
                            </FaShoppingCart>
                        </NavLink>
                    }
                    {
                        (role === 'admin' || role === 'instructor') && <NavLink className='relative me-2' to='/dashboard/selectedClasses'>
                            <p className="absolute -right-2 -top-3 text-[#03e9a4]"></p>
                            <IoMdNotifications className="text-2xl mb-1">
                            </IoMdNotifications>
                        </NavLink>
                    }
                    {
                        user ? <button onClick={handleLogout} className="my-button mb-1">Log Out</button> : <Link className="my-button mb-1" to='/login'>Login</Link>
                    }
                    {
                        user && <img className="h-10 w-10 bg-blue-400 rounded-full" src={user.photoURL} alt="" />
                    }
                    <button>
                        <label className="swap swap-rotate">

                            {/* this hidden checkbox controls the state */}
                            <input onChange={handleTheme} type="checkbox" />

                            {/* sun icon */}
                            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            {/* moon icon */}
                            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                    </button>
                </ul>
            </div>

            {/* mobile */}
            <div className="lg:hidden flex">
                {
                    !isOpen && <div className="flex justify-between items-center py-5 w-full my-container">
                        <div className="flex items-center">
                            <img className="w-8" src="logo.png" alt="" />
                            <h1 className="italic text-xl font-bold">CoutureCamp</h1>
                        </div>
                        <button onClick={() => { setIsOpen(true) }}>
                            <FaBars className="text-xl"></FaBars>
                        </button>
                    </div>
                }
                {
                    isOpen && <ul className="flex flex-col gap-4 py-4 rounded-md items-center backdrop-blur-3xl right-1 top-1 w-full ms-auto">
                        <button onClick={() => { setIsOpen(false) }}>
                            <IoMdClose className="text-2xl absolute right-2 top-2"></IoMdClose>
                        </button>
                        {
                            user && <img className="h-10 w-10 bg-blue-400 rounded-full" src={user.photoURL} alt="" />
                        }
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/'>Home</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/classes'>Classes</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/instructors'>Instructors</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/dashboard'>Dashboard</NavLink>
                        {
                            role === 'student' &&
                            <NavLink className='relative me-2' to='/dashboard/selectedClasses'>
                                <p className="absolute -right-4 -top-3 text-[#03e9a4]">{cart?.length || 0}</p>
                                <FaShoppingCart className="text-xl">
                                </FaShoppingCart>
                            </NavLink>
                        }
                        {
                            (role === 'admin' || role === 'instructor') && <NavLink className='relative me-2' to='/dashboard/selectedClasses'>
                                <p className="absolute -right-4 -top-3 text-[#03e9a4]">{cart?.length || 0}</p>
                                <IoMdNotifications className="text-xl">
                                </IoMdNotifications>
                            </NavLink>
                        }
                        {
                            user ? <button onClick={handleLogout} className="my-button mb-1">Log Out</button> : <Link onClick={() => setIsOpen(false)} className="my-button mb-1" to='/login'>Login</Link>
                        }
                        {
                            user && <img className="h-10 w-10 bg-blue-400 rounded-full" src={user.photoURL} alt="" />
                        }
                        <button onClick={handleToggle}>
                            <input type="checkbox" className="toggle toggle-info" checked />
                        </button>
                    </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;