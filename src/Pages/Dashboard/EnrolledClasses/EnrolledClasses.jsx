import { useContext } from "react";
import SectionHeading from "../../../Components/SectionHeading";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import HelmetTitle from "../../../Components/HelmetTitle";

const EnrolledClasses = () => {

    const { user } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()

    const { data: classes = [] } = useQuery({
        queryKey: ['enrolled-classes', user],
        queryFn: async () => {
            const res = await secureAxios.get(`/payment/user/classes/${user?.email}`)
            return res.data
        }
    })

    console.log(classes);

    return (
        <div className="dash-container">
            <HelmetTitle title='Enrolled Classes'></HelmetTitle>
            <SectionHeading heading='enrolled classes' number={classes.length}></SectionHeading>
            <div className="max-w-[100vw] overflow-x-hidden">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#06d497]">
                        <tr>
                            <th>
                            </th>
                            <th>Details</th>
                            <th>Instractor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((item, index) => {
                                return <tr className="text-center border" key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3 text-start">
                                            <div className="avatar">
                                                <div className="rounded-md w-24 h-24">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div>Price: ${item.price}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.instructor}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {
                    classes.length === 0 && <div className="flex h-[60vh] justify-center items-center">
                        <p>You have't enrolled to any classes</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default EnrolledClasses;