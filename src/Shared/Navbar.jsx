import { Link, NavLink } from "react-router-dom";
import { FaBars, FaBitbucket, FaShoppingCart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io'
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import UseCart from "../Hooks/UseCart";

const Navbar = () => {

    const { cart } = UseCart()
    const { user, logOut } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    console.log(user);

    const handleLogout = () => {
        logOut()
        localStorage.removeItem('access-token')
        setIsOpen(false)
    }

    return (
        <div className="fixed w-full backdrop-blur-sm z-10 shadow-md">
            <div className=" my-container lg:flex justify-between hidden py-5">
                <div className="flex items-center">
                    <img className="w-10" src="logo.png" alt="" />
                    <h1 className="italic text-3xl font-bold">CoutureCamp</h1>
                </div>
                <ul className="flex gap-8 items-center text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/'>Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/classes'>Classes</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/instructors'>Instructors</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/dashboard'>Dashboard</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/dashboard/selectedClasses'>
                        <p className="absolute top-2 ps-1 text-[#03e9a4]">{cart.length}</p>
                        <FaShoppingCart className="text-xl">
                        </FaShoppingCart>
                    </NavLink>
                    {
                        user ? <button onClick={handleLogout} className="my-button mb-1">Log Out</button> : <Link className="my-button mb-1" to='/login'>Login</Link>
                    }
                    {
                        user && <img className="h-10 w-10 bg-blue-400 rounded-full" src={user.photoURL} alt="" />
                    }
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
                    isOpen && <ul className="flex flex-col gap-2 py-4 rounded-md items-center backdrop-blur-sm right-1 top-1 w-full ms-auto">
                        <button onClick={() => { setIsOpen(false) }}>
                            <IoMdClose className="text-2xl absolute right-2 top-2"></IoMdClose>
                        </button>
                        {
                            user && <img className="h-10 w-10 bg-blue-400 rounded-full" src={user.photoURL} alt="" />
                        }
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/'>Home</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/classes'>Classes</NavLink>
                        <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'border-b-4 border-[#03e9a4] px-1' : 'px-1 border-b-4 border-transparent'} to='/instructors'>Instructors</NavLink>
                        {
                            user ? <button onClick={handleLogout} className="my-button">Log Out</button> : <Link onClick={() => setIsOpen(false)} className="my-button mb-1" to='/login'>Login</Link>
                        }
                    </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;