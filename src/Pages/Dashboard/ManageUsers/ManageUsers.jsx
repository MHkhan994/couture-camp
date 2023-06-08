import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../Components/SectionHeading";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";

const ManageUsers = () => {

    const [secureAxios] = UseSecureAxios()

    const { data: users = [] } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await secureAxios('/users')
            return res.data
        }
    })

    console.log(users);

    return (
        <div className="dash-container">
            <SectionHeading heading='Manage Users'></SectionHeading>
            <div className="grid lg:grid-cols-2 gap-4">
                {
                    users.map(user => <div key={user._id} className="flex flex-col lg:flex-row justify-between bg-white rounded-md shadow-lg p-3">
                        <img className="h-44 rounded-md" src={user.image} alt="" />
                        <div className="flex justify-center flex-col flex-grow ps-6">
                            <h2 className="text-xl"><span className="font-semibold">Name: </span> {user.name}</h2>
                            <h2 className="text-xl"><span className="font-semibold">Instructor: </span> {user.email}</h2>
                            <h2 className="text-xl"><span className="font-semibold">Price: </span> ${user.role}</h2>
                        </div>
                        <div className="lg:flex flex-col justify-center lg:pe-10 gap-3">

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageUsers;