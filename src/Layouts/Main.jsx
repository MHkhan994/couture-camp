import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
    return (
        <div className="bg-[#1a2022] min-h-screen">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;