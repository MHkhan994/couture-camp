import { useParams } from "react-router-dom";
import UseCart from "../../../Hooks/UseCart";
import SectionHeading from "../../../Components/SectionHeading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.VITE_Pusblish_Key}`)

const Payment = () => {
    const params = useParams('id')
    const id = params.id
    const { cart, cartLoading } = UseCart()
    let selectedClass = {}
    if (!cartLoading) {
        selectedClass = cart.find(i => i._id === id)
    }


    const { image, name, price, instructor, email } = selectedClass
    return (
        !cartLoading && <div className="dash-container">
            <SectionHeading heading='payment'></SectionHeading>
            <div className="flex flex-col items-center gap-3">
                <img className="lg:w-1/3 w-[70%] pb-5 rounded-md" src={image} alt="" />
            </div>
            <div className="form-control mb-2 grid lg:grid-cols-2 md:grid-cols-2 gap-6 font-semibold w-full">
                <input readOnly value={`Class Name: ${name}`} type="text" className="input input-bordered" />
                <input readOnly value={`Instructor: ${instructor}`} type="text" className="input input-bordered" />
                <input readOnly value={`Student Email: ${email} days`} type="text" className="input input-bordered" />
                <input readOnly value={`Price: $${price}`} type="text" className="input input-bordered" />
            </div>
            <div className="form-control py-3">
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price} selectedClass={selectedClass} />
                </Elements>
            </div>
        </div>

    );
};

export default Payment;