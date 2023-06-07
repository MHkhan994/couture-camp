import PageBanner from "../../Components/PageBanner";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import ClassCard from "./ClassCard";

const Classes = () => {

    const { data: classes = [], isLoading } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/classes')
            return res.data
        }
    })


    return (
        <div>
            <PageBanner heading='Our Classes'></PageBanner>
            {
                isLoading && <LoadingSpinner></LoadingSpinner>
            }
            {
                !isLoading && <div className="my-container grid gap-4 mt-20 lg:grid-cols-3">
                    {
                        classes.map(item => <ClassCard data-aos='fade-up' data-aos-duration='2000' key={item._id} item={item}></ClassCard>)
                    }
                </div>

            }
        </div>
    );
};

export default Classes;