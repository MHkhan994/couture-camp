import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io'
import { useState } from "react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-[#3f4e4f88] fixed w-full backdrop-blur-sm z-10">
            <div className="text-white my-container lg:flex justify-between hidden py-5">
                <h1 className="italic text-3xl font-bold">CoutureCamp</h1>
                <ul className="flex gap-8 items-center">
                    <Link to='/'>Home</Link>
                    <Link to='/classess'>Classess</Link>
                    <Link to='/instructors'>Instructors</Link>
                </ul>
            </div>

            {/* mobile */}
            <div className="lg:hidden flex">
                {
                    !isOpen && <div className="flex justify-between items-center py-5 w-full text-white my-container">
                        <h1 className="italic text-xl font-bold">CoutureCamp</h1>
                        <button onClick={() => setIsOpen(true)}>
                            <FaBars className="text-xl"></FaBars>
                        </button>
                    </div>
                }
                {
                    isOpen && <ul className="flex flex-col gap-2 text-white py-4 rounded-md items-center  right-1 top-1 w-full ms-auto">
                        <button onClick={() => setIsOpen(false)}>
                            <IoMdClose className="text-2xl absolute right-2 top-2"></IoMdClose>
                        </button>
                        <Link to='/'>Home</Link>
                        <Link to='/classess'>Classess</Link>
                        <Link to='/instructors'>Instructors</Link>
                    </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;