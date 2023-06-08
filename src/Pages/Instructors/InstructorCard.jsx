import Aos from 'aos';
import { useEffect } from "react";
import 'aos/dist/aos.css';
import './Instructors.css'

const InstructorCard = ({ item }) => {
    const { name, image, email, classNames } = item;

    useEffect(() => {
        Aos.init()
    }, [])

    return (
        <div data-aos="fade-up" data-aos-duration="1000" className="card border shadow-md">
            <div className="image-container">
                <img src={image} alt="Instructor" className="rounded-lg" />
                <div className="overlay">
                    <h2 className='text-white'>{email}</h2>
                </div>
            </div>
            <div className="card-body">
                <h2 className="text-2xl font-bold">{name}</h2>
                <div>
                    <p className='text-lg font-semibold'>Classes:</p>
                    {
                        classNames.map((name, index) => <p className='ps-4' key={name}>
                            <span className='text-[#03e9a4] pe-1'>{index + 1}.</span> {name}
                        </p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;
