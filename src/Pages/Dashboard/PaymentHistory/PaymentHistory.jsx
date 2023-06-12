import { useContext } from "react";
import SectionHeading from "../../../Components/SectionHeading";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import HelmetTitle from "../../../Components/HelmetTitle";

const PaymentHistory = () => {
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
            <HelmetTitle title='Payment History'></HelmetTitle>
            <SectionHeading heading='payment history'></SectionHeading>
            <div className="overflow-x-auto max-w-[100vw]">
                <table className="table-lg w-full">
                    {/* head */}
                    <thead className="bg-[#06d497]">
                        <tr>
                            <th>
                            </th>
                            <th>Details</th>
                            <th>Transaction Id</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((item, index) => {
                                const date = new Date(item.date);

                                const day = date.getUTCDate();
                                const month = date.getUTCMonth() + 1;
                                const year = date.getUTCFullYear().toString().slice(-2);

                                const formattedDate = `${day}-${month}-${year}`;
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
                                        {item.transactionId}
                                    </td>
                                    <td>
                                        {formattedDate}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {
                    classes.length === 0 && <div className="flex h-[60vh] justify-center items-center">
                        <p>No payment history</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default PaymentHistory;