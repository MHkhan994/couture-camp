import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../Components/SectionHeading";
import Swal from "sweetalert2";

const ManageClasses = () => {

    const { user } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()

    const { data: userclasses = [], refetch: classRefetch, isLoading: classLoading } = useQuery({
        queryKey: ['instructors-classes', user],
        queryFn: async () => {
            const res = await secureAxios.get('/classes/admin/all')
            return res.data
        }
    })

    console.log(userclasses);

    const handleStatusChange = (id, status) => {
        secureAxios.patch('/instructor-class/status', { id, status })
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId > 0) {
                    const message = status === 'approved' ? 'class approved' : 'class denied'
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }


    return (
        <div className="dash-container">
            <SectionHeading heading='Manage Classes'></SectionHeading>
            <div className="grid lg:grid-cols-1 gap-4 justify-center">
                {
                    userclasses.map(item => <div key={item._id} className="flex flex-col md:flex-row lg:flex-row justify-between bg-white rounded-md shadow-lg p-3 gap-3 lg:items-center items-start">
                        <img className="h-32 rounded-lg" src={item.image} alt="" />
                        <div>
                            <h1>Name: {item.name}</h1>
                            <p>Instructor: {item.instructor}</p>
                            <p>Instructor Email: {item.email}</p>
                        </div>
                        {
                            item.status === 'pending' && <p className="text-orange-600 bg-[#000] rounded-md px-2 py-1">{item.status}</p>
                        }
                        {
                            item.status === 'approved' && <p className="text-green-600 bg-[#000] rounded-md px-2 py-1">{item.status}</p>
                        }
                        <div className="flex flex-col justify-center lg:pe-10 gap-2">
                            <button disabled={item.status === 'approved' || item.status === 'denied'} onClick={() => handleStatusChange(item._id, 'approved')} className="py-1 px-4 shadow-md disabled-button bg-gray-200">
                                Approve
                            </button>
                            <button disabled={item.status === 'approved' || item.status === 'denied'} onClick={() => handleStatusChange(item._id, 'denied')} className="py-1 px-4 shadow-md border disabled-button bg-gray-200">
                                Deny
                            </button>
                            <button disabled={item.status === 'approved' || item.feedback} onClick={() => handleStatusChange(item._id, 'denied')} className="py-1 px-4 shadow-md border disabled-button bg-gray-200">
                                Feedback
                            </button>
                        </div>
                    </div>)
                }
            </div>
        </div >
    );
};

export default ManageClasses;