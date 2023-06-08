import Aos from 'aos';
import { useEffect } from "react";
import 'aos/dist/aos.css';

const ClassCard = ({ item }) => {

    useEffect(() => {
        Aos.init()
    }, [])

    const { name, price, instructor, image, duration, availableSeats } = item;

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
                <button disabled={availableSeats === 0} className={availableSeats === 0 ? "my-button w-40 mx-auto" : "my-button w-40 mx-auto mt-2"}>
                    Select
                </button>
            </div>
        </div>
    );
};

export default ClassCard;