import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PageBanner from "../../Components/PageBanner";
import LoadingSpinner from "../../Components/LoadingSpinner";
import InstructorCard from "./InstructorCard";
import HelmetTitle from "../../Components/HelmetTitle";

const Instructors = () => {

    const { data: instructors = [], isLoading } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await axios.get('https://couture-camp-server.vercel.app/instructors')
            return res.data
        }
    })


    return (
        <div>
            <HelmetTitle title='Instructors'></HelmetTitle>
            <PageBanner heading='Our Instructors'></PageBanner>
            {
                isLoading && <LoadingSpinner></LoadingSpinner>
            }
            {
                !isLoading && <div className="my-container grid gap-4 mt-20 lg:grid-cols-3 md:grid-cols-2">
                    {
                        instructors.map(item => <InstructorCard key={item._id} item={item}>

                        </InstructorCard>)
                    }
                </div>
            }
        </div>
    );
};

export default Instructors;