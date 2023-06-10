import { useForm } from "react-hook-form";
import SectionHeading from "../../../Components/SectionHeading";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseSecureAxios from "../../../Hooks/UseSecureAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const img_hosting_token = import.meta.env.VITE_Img_Upload_Token;

const AddClass = () => {

    const { user } = useContext(AuthContext)
    const [secureAxios] = UseSecureAxios()
    const navigate = useNavigate()

    const { data: classes = [] } = useQuery({
        queryKey: ['instructors-classes', user],
        queryFn: async () => {
            const res = await secureAxios.get(`/classes/instructor/${user.email}`)
            return res.data
        }
    })


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        if (classes.length >= 3) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "you can't add more than 3 classes",
                text: 'you already have 3 classes',
                showConfirmButton: false,
                timer: 2000
            })
            return
        }
        const formData = new FormData()
        formData.append('image', data.photo[0])
        fetch(`https://api.imgbb.com/1/upload?&key=${img_hosting_token}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                const imgURL = imgData.data?.display_url
                const newClass = {
                    name: data.name,
                    price: parseInt(data.price),
                    instructor: data.instructor,
                    email: user.email,
                    availableSeats: parseInt(data.seats),
                    duration: parseInt(data.duration),
                    students: 0,
                    image: imgURL,
                    status: 'pending'
                }

                // add to class db
                secureAxios.post('/class/add', newClass)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'class pending approval',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate('/dashboard/myClasses')
                        }
                    })
                console.log(newClass);
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'something went wrong!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    };


    return (
        <div className="dash-container">
            <SectionHeading heading='add class'></SectionHeading>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="grid lg:grid-cols-2 gap-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input {...register('name', { required: true })} type="text" placeholder="Class Name" className="input input-bordered" />
                            {errors?.name?.type === 'required' && <p className="text-red-500 pt-2">class name is required.</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Instructor Name</span>
                            </label>
                            <input readOnly defaultValue={user.displayName} {...register('instructor', { required: true })} type="text" placeholder="Instructor" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Instructor Email</span>
                            </label>
                            <input readOnly defaultValue={user.email} {...register('email', { required: true })} type="text" placeholder="Instructor Email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input {...register('price', { min: 10, max: 200 })} type="number" placeholder="Price" className="input input-bordered" required />
                            {(errors?.price?.type === 'min' || errors.price?.type === 'max') && <p className="text-red-500 pt-2">price should be between $10-200</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Seats</span>
                            </label>
                            <input type="number" {...register('seats', { min: 5, max: 30 })} placeholder="Seats" className="input input-bordered" required />
                            {(errors?.seats?.type === 'min' || errors.seats?.type === 'max') && <p className="text-red-500 pt-2">each class should have 5-30 students.</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Duration</span>
                            </label>
                            <input {...register('duration', { min: 15, max: 120 })} required type="number" placeholder="Duration" className="input input-bordered" />
                            {(errors?.duration?.type === 'min' || errors.duration?.type === 'max') && <p className="text-red-500 pt-2">each class course duration shuld be 15-120 days.</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input {...register('photo', { required: true })} type="file" className="w-full" />
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        <input className="h-12 bg-[#06d497] text-white rounded-md w-[50%]" type="submit" value='Add Class' />
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddClass;