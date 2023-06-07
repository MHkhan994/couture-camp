import { useForm } from "react-hook-form";
import loginImg from '../../assets/login.png'
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import axios from "axios";

const Register = () => {
    const { createUser, logOut } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        setError('')
        if (data.password.length < 6) {
            setError('password should be at lease 6 charecters')
            return
        }
        else if (!/^[A-Z!@#$%^&*]/.test(data.password)) {
            setError('password should contain at lease one uppercase and one special character')
            return
        }
        else if (data.password !== data.confirm_password) {
            setError("password does't match")
            return
        }
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                updateProfile(result.user, {
                    displayName: data.name,
                    phoneNumber: data.phone || null,
                    address: data.address
                })
                    .then(() => {
                        const newUser = {
                            email: data.email,
                            phoneNumber: data.phone || '',
                            address: data.address || '',
                            gender: data.gender || '',
                            role: 'student'
                        }
                        axios.post('http://localhost:5000/users', newUser)
                            .then(res => {
                                if (res.data.insertedId) {
                                    logOut()
                                    navigate('/login')
                                }
                            })
                    })
            })
            .catch(error => {
                console.log(error.message)
                if (error.message.includes('email-already-in-use')) {
                    setError({ type: 'user exists' })
                }
            })
    };

    return (
        <div className="grid lg:grid-cols-2 items-center min-h-screen my-container gap-8 pt-20 pb-10">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register('name', { required: true })} type="text" placeholder="Your Name" className="input shadow-sm input-bordered rounded-[20px]" />
                        {errors.name?.type === 'required' && <p role="alert" className="text-red-500 pt-2">name is required</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register('email', { required: true })} type="text" placeholder="Your Email" className="input shadow-sm input-bordered rounded-[20px]" />
                        {errors.email?.type === 'required' && <p role="alert" className="text-red-500 pt-2">Email is required</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password', { required: true })} type="password" placeholder="Your Password" className="input shadow-sm input-bordered rounded-[20px]" />
                        {errors.password?.type === 'required' && <p role="alert" className="text-red-500 pt-2">Please type your password</p>}
                        {error && <p className="text-red-500 pt-2">{error}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input {...register('confirm_password', { required: true })} type="password" placeholder="confirm Password" className="input shadow-sm input-bordered rounded-[20px]" />
                        {errors.confirm_password?.type === 'required' && <p role="alert" className="text-red-500 pt-2">Please confirm your password</p>}
                        {
                            error === "password does't match" && <p role="alert" className="text-red-500 pt-2">password does't match</p>
                        }
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Gender</span>
                        </label>
                        <select {...register('gender')} className="input shadow-sm input-bordered rounded-[20px]">
                            <option value="">Choose Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone number</span>
                        </label>
                        <input {...register('phono')} type="number" placeholder="Your Number" className="input shadow-sm input-bordered rounded-[20px]" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input {...register('address')} type="text" placeholder="Your Address" className="input shadow-sm input-bordered rounded-[20px]" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input {...register('photo')} type="file" className="" />
                    </div>
                    {/* {
                        error?.type === 'user exists' && <p>user already exist</p>
                    } */}
                    <input className="my-button mt-3" type="submit" value='Register' />
                </form>
                <p className="pt-5 text-center">Or register with</p>
                <div className="flex justify-center pt-3 text-white text-2xl gap-3">
                    <button className="bg-blue-500 rounded-full px-2 py-2">
                        <FaGoogle></FaGoogle>
                    </button>
                    <button className="bg-gray-500 rounded-full px-2 py-2">
                        <FaGithub></FaGithub>
                    </button>
                </div>
                <p className="text-center pt-4">Already have an accout? <Link className="text-[#03e9a4]" to='/login'>Login</Link></p>
            </div>
            <img src={loginImg} alt="" />
        </div>
    );
};

export default Register;