import { FaTrash } from "react-icons/fa";
import SectionHeading from "../../../Components/SectionHeading";
import UseCart from "../../../Hooks/UseCart";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import HelmetTitle from "../../../Components/HelmetTitle";

const SelectedClasses = () => {

    const { user } = useContext(AuthContext)
    const { cart, refetch, cartLoading } = UseCart()
    const [secureAxios] = UseSecureAxios()

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this class?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                secureAxios.delete(`/cart/${id}`, { email: user?.email })
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'The class has been removed',
                                'success'
                            )
                            refetch()
                        }
                    })
            }
        })
    }

    return (
        <div className='dash-container'>
            <HelmetTitle title='Selected Classes'></HelmetTitle>
            <SectionHeading heading='selected classes' number={cart.length}></SectionHeading>
            {
                !cartLoading && <div className="grid lg:grid-cols-1 gap-5">
                    {
                        cart.map(item => <div key={item._id} className="flex flex-col lg:flex-row justify-between border rounded-md shadow-lg p-3">
                            <img className="lg:h-44 rounded-md" src={item.image} alt="" />
                            <div className="flex justify-center flex-col flex-grow ps-6">
                                <h2 className="text-xl"><span className="font-semibold">Name: </span> {item.name}</h2>
                                <h2 className="text-xl"><span className="font-semibold">Instructor: </span> {item.instructor}</h2>
                                <h2 className="text-xl"><span className="font-semibold">Price: </span> ${item.price}</h2>
                            </div>
                            <div className="lg:flex flex-col justify-center lg:pe-10 gap-3">
                                <div className="flex lg:flex-col gap-3 justify-center py-3">
                                    <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-600 rounded-md text-white text-xl flex justify-center">
                                        <FaTrash className="text-center"></FaTrash>
                                    </button>
                                    <Link className="p-2 px-4 bg-green-600 text-white rounded-md font-semibold" to={`/dashboard/payment/${item._id}`}>Pay</Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            }
            {
                cart.length === 0 && <div className="flex h-[60vh] justify-center items-center">
                    <p>You have't selected any classes</p>
                </div>
            }
        </div>
    );
};

export default SelectedClasses;