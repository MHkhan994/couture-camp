import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UseSecureAxios from '../../../Hooks/UseSecureAxios';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = ({ price, selectedClass }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = useContext(AuthContext)
    const [cardError, setCardError] = useState('')
    const [secureAxios] = UseSecureAxios()
    const [clientSecret, setClientSecret] = useState('')
    const [paymentLoading, setPaymentLoading] = useState(false)
    const navigate = useNavigate()

    const total = parseFloat(price.toFixed(2))

    console.log(selectedClass);

    useEffect(() => {
        secureAxios.post("/create-payment-intent", { total })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPaymentLoading(true)

        Swal.fire({
            title: 'Confirm Payment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (!stripe || !elements) {
                    return
                }

                const card = elements.getElement(CardElement);
                if (card == null) {
                    return;
                }

                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card
                })

                if (error) {
                    console.log(error);
                    setCardError(error.message)
                }

                else {
                    setCardError('')
                }

                const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                    clientSecret,
                    {
                        payment_method: {
                            card: card,
                            billing_details: {
                                email: user?.email || 'unknown',
                                name: user?.name || 'unknown',
                            },
                        },
                    },
                );

                if (paymentIntent.status === 'succeeded') {

                    selectedClass.transactionId = paymentIntent.id;
                    console.log(selectedClass);
                    secureAxios.post('/class/payment', selectedClass)
                        .then(res => {
                            if (res.data.success === true) {
                                Swal.fire(
                                    'Payment Successfull',
                                    'success'
                                )
                                navigate('/dashboard/enrolledClasses')
                            }
                        })

                }

                if (confirmError) {
                    console.log(confirmError, paymentIntent);
                }

                setPaymentLoading(false)
            }
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='h-12 border rounded-md grid px-10 bg-white items-center'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            {cardError && <p className='text-red-500 text-center pt-3'>{cardError}</p>}
            <div className='flex justify-center pt-4'>
                <button className='my-button' type="submit" disabled={!useStripe || !clientSecret || paymentLoading}>
                    Pay
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;