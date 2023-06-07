import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {

    return (
        <div className=" min-h-screen">

            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;