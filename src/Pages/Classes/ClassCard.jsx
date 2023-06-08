import Aos from 'aos';
import { useContext, useEffect } from "react";
import 'aos/dist/aos.css';
import { AuthContext } from '../../Providers/AuthProvider';
import UseSecureAxios from '../../Hooks/UseSecureAxios';
import Swal from 'sweetalert2';
import UseCart from '../../Hooks/UseCart';

const ClassCard = ({ item }) => {
    const { _id, name, price, instructor, image, duration, availableSeats } = item;

    const { cart, refetch } = UseCart()
    // gets all the item ids to cartIds array. if item._id is in cartIds button isDisabled === true
    const cartIds = cart.map(item => item.itemId)
    const isdisabled = cartIds.includes(_id) || availableSeats === 0

    const { user } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()


    const handleAddtoCart = () => {
        const classItem = {
            itemId: _id,
            image,
            instructor,
            name,
            email: user.email,
            price
        }

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
                    Select
                </button>
            </div>
        </div>
    );
};

export default ClassCard;