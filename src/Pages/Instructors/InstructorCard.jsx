
import './Instructors.css'

const InstructorCard = ({ item }) => {
    const { name, image, email } = item;

    return (
        <div className="card border shadow-md">
            <div className="image-container">
                <img src={image} alt="Instructor" className="rounded-lg" />
                <div className="overlay">
                    <h2 className='text-white'>{email}</h2>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
            </div>
        </div>
    );
};

export default InstructorCard;
