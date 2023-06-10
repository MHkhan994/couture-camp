import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import SectionHeading from "../../../Components/SectionHeading";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";

const MyClasses = () => {

    const [secureAxios] = UseSecureAxios()
    const { user } = useContext(AuthContext)

    const { data: userclasses = [], refetch: classRefetch, isLoading: classLoading } = useQuery({
        queryKey: ['instructors-classes', user],
        queryFn: async () => {
            const res = await secureAxios.get(`/classes/instructor/${user.email}`)
            return res.data
        }
    })

    const handleDelteClass = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                secureAxios.delete(`/class/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            classRefetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    console.log(userclasses);

    return (
        <div className="dash-container">
            <SectionHeading heading="my classes"></SectionHeading>
            {
                classLoading && <LoadingSpinner></LoadingSpinner>
            }
            {
                !classLoading && <div className="overflow-x-auto">
                    <table className="table-lg w-full">
                        {/* head */}
                        <thead className="bg-[#06d497]">
                            <tr>
                                <th>
                                </th>
                                <th>Details</th>
                                <th>Feedback</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userclasses.map((item, index) => <tr className="text-center" key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3 text-start">
                                            <div className="avatar">
                                                <div className="rounded-md w-24 h-24">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="">Students: {item.students}</div>
                                                <div>Price: ${item.price}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.feedback || 'No feedback available'}
                                    </td>
                                    <td>
                                        {item.status == 'pending' && <p className="text-orange-400">{item.status}</p>}
                                        {item.status == 'denied' && <p className="text-red-700">{item.status}</p>}
                                        {item.status == 'approved' && <p className="text-green-500">{item.status}</p>}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelteClass(item._id)} disabled={item.status === 'approved'} className="py-1 px-3 border disabled-button bg-gray-200 font-normal">
                                            delete
                                        </button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default MyClasses;