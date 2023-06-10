import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../../Components/SectionHeading";
import ManageClassCard from "./ManageClassCard";

const ManageClasses = () => {

    const { user } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()

    const { data: userclasses = [], refetch: classRefetch } = useQuery({
        queryKey: ['instructors-classes', user],
        queryFn: async () => {
            const res = await secureAxios.get('/classes/admin/all')
            return res.data
        }
    })

    return (
        <div className="dash-container">
            <SectionHeading heading='Manage Classes'></SectionHeading>
            <div className="grid lg:grid-cols-1 gap-4 justify-center">
                {
                    userclasses.map(item => <ManageClassCard
                        key={item._id}
                        item={item}
                        classRefetch={classRefetch}
                    ></ManageClassCard>)
                }
            </div>
        </div >
    );
};

export default ManageClasses;