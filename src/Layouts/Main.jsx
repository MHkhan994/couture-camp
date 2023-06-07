import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
    return (
        <div className=" min-h-screen">

            <Navbar></Navbar>
            <Outlet></Outlet>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Main;