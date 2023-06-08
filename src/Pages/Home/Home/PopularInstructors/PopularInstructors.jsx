import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeading from "../../../../Components/SectionHeading";
import { Link } from "react-router-dom";
import InstructorCard from "../../../Instructors/InstructorCard";

const PopularInstructors = () => {
    const { data: instructors = [] } = useQuery({
        queryKey: ['popular-instructors'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/instructors/popular')
            return res.data
        }
    })


    return (
        <div className="pb-20 my-container">
            <SectionHeading heading='popular Instructors'></SectionHeading>
            <div className="grid lg:grid-cols-3 gap-4">
                {
                    instructors.map(item => <InstructorCard key={item._id} item={item}></InstructorCard>)
                }
            </div>
            <div className="flex justify-center pt-5">
                <button className="my-button-second mx-auto">
                    <Link to='/instructors'>All Instructors</Link>
                </button>
            </div>
        </div >
    );
};

export default PopularInstructors;