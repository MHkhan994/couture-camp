import Aos from 'aos';
import { useContext, useEffect } from "react";
import 'aos/dist/aos.css';
import { AuthContext } from '../../Providers/AuthProvider';
import UseSecureAxios from '../../Hooks/UseSecureAxios';
import Swal from 'sweetalert2';
import UseCart from '../../Hooks/UseCart';
import { useNavigate } from 'react-router-dom';
import UseFindRole from '../../Hooks/UseFindRole';

const ClassCard = ({ item }) => {
    const { _id, name, price, instructorEmail, instructor, image, duration, availableSeats } = item;
    const { user, loading } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()
    const navigate = useNavigate()
    const { role } = UseFindRole()

    // gets all the item ids to cartIds array. if item._id is in cartIds button isDisabled === true
    const { cart, refetch } = UseCart()
    const userCart = cart.filter(item => item.email === user.email)
    const cartIds = userCart.map(item => item.itemId)
    const isdisabled = cartIds.includes(_id) || availableSeats === 0 || role === 'admin' || role === 'instructor'



    const handleAddtoCart = () => {
        if (!user && loading) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'please login to book class',
                showConfirmButton: false,
                timer: 1200
            })
            navigate('/login')
        }

        else {
            const classItem = {
                itemId: _id,
                image,
                instructor,
                instructorEmail,
                name,
                email: user?.email,
                price
            }

            secureAxios.patch(`/payments/user`, { id: _id, email: user?.email })
                .then(res => {
                    if (res.data.exists === true) {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'you have already enrolled in this class',
                            showConfirmButton: false,
                            timer: 1200
                        })
                        return
                    }
                    else {
                        secureAxios.post('/cart', classItem)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.exists === 'exists') {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'warning',
                                        title: 'class already added',
                                        showConfirmButton: false,
                                        timer: 1200
                                    })
                                    return
                                }
                                else if (res.data.insertedId) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'class added for enrollment',
                                        showConfirmButton: false,
                                        timer: 1200
                                    })
                                    refetch()
                                }
                            })
                            .catch(error => {
                                if (error.status === 401) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'warning',
                                        title: 'please login to add to cart',
                                        showConfirmButton: false,
                                        timer: 1200
                                    })
                                }
                            })
                    }
                })




        }
    }

    useEffect(() => {
        Aos.init()
    }, [])


    return (
        <div data-aos="fade-up" data-aos-duration="1000" className={availableSeats === 0 ? "card card-compact bg-red-100 border-red-700 border shadow-lg" : "card card-compact bg-base-100 shadow-lg"}>
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h1 className="text-xl font-semibold pt-2">Course Name: {name}</h1>
                <div className="text-lg space-y-1 text-gray-800">
                    <p>Instructor: <span className='italic'>{instructor}</span></p>
                    <p className={availableSeats === 0 ? 'text-red-600' : ''}>Seat Available: {availableSeats}</p>
                    <p>Course Fee: <span className='text-green-600'>${price}</span></p>
                    <p>Duration: {duration} days</p>
                </div>
                <button onClick={handleAddtoCart} disabled={isdisabled} className={availableSeats === 0 ? "my-button w-40 mx-auto" : "my-button w-40 mx-auto mt-2"}>
                    select
                </button>
            </div>
        </div>
    );
};

export default ClassCard;