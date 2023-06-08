import { useContext } from "react";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const Dashboard = () => {

    const { user, loading } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()

    const { data: role = '' } = useQuery({
        queryKey: ['user-role', user, secureAxios],
        enabled: !loading,
        queryFn: async () => {
            const res = await secureAxios(`/users/role/${user.email}`)
            return res.data.role
        }
    })

    console.log(role);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side m-5 rounded-md">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                {
                    role === 'student' && <ul className="menu p-4 w-64 h-full bg-gray-900 text-white">
                        <NavLink>Selected Classes</NavLink>
                        <NavLink>Enroled Classes</NavLink>
                        <NavLink>Payment History</NavLink>
                    </ul>
                }

            </div>
        </div>
    );
};

export default Dashboard;