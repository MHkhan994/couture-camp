import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../Components/SectionHeading";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import Swal from "sweetalert2";


const ManageUsers = () => {

    const [secureAxios] = UseSecureAxios()

    const { data: users = [], refetch: usersRefetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await secureAxios('/users')
            return res.data
        }
    })


    // -------------------- deltes user form database and also user cart--------------
    const handleDeleteUser = (email) => {
        Swal.fire({
            title: 'Are you sure you want to delete this user?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete user'
        }).then((result) => {
            if (result.isConfirmed) {
                secureAxios.delete(`/user/${email}`)
                    .then(() => {
                        Swal.fire(
                            'User has been deleted.',
                            'success'
                        )
                        usersRefetch()
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    })
            }
        })

    }


    // -------------------- updates userrole to instructor or admin------------
    const handleUpdateRole = (email, newRole) => {
        Swal.fire({
            title: `make this user an ${newRole}?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `yes make ${newRole}`
        }).then((result) => {
            if (result.isConfirmed) {
                secureAxios.patch('/user/update-role', { email, newRole })
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            text: `User Promoted to ${newRole}`,
                        })
                        usersRefetch()
                    })
                    .catch(error => console.log(error))
            }
        })
    }


    return (
        <div className="dash-container">
            <SectionHeading heading='Manage Users'></SectionHeading>
            <div className="grid lg:grid-cols-1 gap-4 justify-center">
                {
                    users.map(user => <div key={user._id} className="flex flex-col md:flex-row lg:flex-row justify-between bg-white rounded-md shadow-lg p-3 gap-3">
                        <div className="flex justify-center items-center">
                            <img className="h-20 w-20 rounded-full" src={user.image} alt="user-image" onError={(e) => { e.target.src = '/errProfile.jpg' }} />
                        </div>
                        <div className="flex justify-center flex-col flex-grow ps-6">
                            <h2 className="text-lg"><span className="font-semibold">Name: </span> {user.name}</h2>
                            <h2 className="text-lg"><span className="font-semibold">Instructor: </span> {user.email}</h2>
                            <h2 className="text-lg text-[#03e9a4]"><span className="font-semibold text-black">Role: </span>{user.role}</h2>
                        </div>
                        <div className="flex flex-col justify-center lg:pe-10 gap-1">
                            <button onClick={() => handleDeleteUser(user.email)} disabled={user.role === 'admin'} className="py-1 px-2 border disabled-button bg-gray-200">
                                Delete User
                            </button>
                            <button onClick={() => handleUpdateRole(user.email, 'instructor')} disabled={user.role === 'instructor' || user.role === 'admin'} className="py-1 px-2 border disabled-button bg-gray-200">
                                Make Instructor
                            </button>
                            <button onClick={() => handleUpdateRole(user.email, 'admin')} disabled={user.role === 'admin'} className="py-1 px-2 border disabled-button bg-gray-200">
                                Make Admin
                            </button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageUsers;