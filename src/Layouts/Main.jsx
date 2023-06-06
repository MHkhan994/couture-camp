import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="bg-[#1a2022] min-h-screen">
            <Outlet></Outlet>
        </div>
    );
};

export default Main;