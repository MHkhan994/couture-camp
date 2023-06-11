import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeading from "../../../../Components/SectionHeading";
import ClassCard from "../../../Classes/ClassCard";
import { Link } from "react-router-dom";

const PopularClasses = () => {

    const { data: classes = [] } = useQuery({
        queryKey: ['popular-classes'],
        queryFn: async () => {
            const res = await axios.get('https://couture-camp-server.vercel.app/classes/popular')
            return res.data
        }
    })


    return (
        <div className="py-20 my-container">
            <SectionHeading heading='popular classes'></SectionHeading>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {
                    classes.map(item => <ClassCard key={item._id} item={item}></ClassCard>)
                }
            </div>
            <div className="flex justify-center pt-5">
                <button className="my-button-second mx-auto">
                    <Link to='/classes'>All Classes</Link>
                </button>
            </div>
        </div>
    );
};

export default PopularClasses;