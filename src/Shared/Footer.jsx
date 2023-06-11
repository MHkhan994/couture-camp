import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {

    const { isNight } = useContext(AuthContext)

    return (
        <div className={isNight ? "lg:h-[60vh] bg-slate-950 mt-20" : "mt-20 lg:h-[60vh] bg-[#03e9a42c]"}>
            <div className="my-container py-14 grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                <div className="space-y-7">
                    <div className="flex items-center">
                        <img className="w-10" src="logo.png" alt="" />
                        <h1 className="italic text-2xl font-bold">CoutureCamp</h1>
                    </div>
                    <p className="">Where Fashion Flourishes, Creativity Takes Flight</p>
                </div>
                <div className="space-y-7 lg:ps-7">
                    <p className="text-xl">Address</p>
                    <div className=''>
                        <p>42/A, Fashion Avenue</p>
                        <p>New York, NY 10001</p>
                    </div>
                    <div>
                        <p>Email: info@couturecamp.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="space-y-7">
                    <h1 className="text-xl">Contact Us</h1>
                    <div className="flex gap-5 text-3xl text-start">
                        <FaFacebook ></FaFacebook>
                        <FaInstagram></FaInstagram>
                        <FaTwitter></FaTwitter>
                    </div>
                </div>
                <div className="space-y-7">
                </div>
            </div>
            <div className="my-container">
                <hr />
                <p className="text-center py-3">@ 2023 Couture-Camp | All rights reserved</p>
            </div>
        </div>
    );
};

export default Footer;