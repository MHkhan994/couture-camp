import { useForm } from "react-hook-form";
import loginImg from '../../assets/login.png'
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {

    const { login, googleLogin } = useContext(AuthContext)
    const [authError, setAuthError] = useState('')
    const navigate = useNavigate()

    // handle email pass login
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        setAuthError('')
        login(data.email, data.password)
            .then((result) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `welcome back ${result.user.displayName}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    navigate('/')
                }, 100);
            })
            .catch(error => {
                console.log(error.message)
                if (error.message.includes('user-not-found')) {
                    setAuthError({ email: 'invalid email address' })
                }
                else if (error.message.includes('wrong-password')) {
                    setAuthError({ password: 'invalid password' })
                }
            })
    };


    // handle googleSignin
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                const newUser = {
                    userId: loggedUser.uid,
                    email: loggedUser.email,
                    name: loggedUser.displayName,
                    phoneNumber: loggedUser.phone || '',
                    address: loggedUser.address || '',
                    gender: loggedUser.gender || '',
                    image: loggedUser.photoURL || '',
                    role: 'student'
                }
                axios.post('http://localhost:5000/users', newUser)
                    .then(res => {
                        if (res.data) {
                            navigate('/')
                        }
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className="grid lg:grid-cols-2 items-center min-h-screen my-container gap-8 pt-20">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register('email', { required: true })} type="email" placeholder="Your Email" className="input shadow-sm input-bordered rounded-[20px]" />
                        {errors.email?.type === 'required' && <p role="alert" className="text-red-500 pt-2">Email is required</p>}
                        {(authError?.email && errors.email?.type !== 'required') && <p className="text-red-500 pt-2">{authError.email}</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password', { required: true })} type="password" placeholder="Your Password" className="input shadow-sm input-bordered rounded-[20px]" />
                        {errors.password?.type === 'required' && <p role="alert" className="text-red-500 pt-2">Please type your password</p>}
                        {(authError?.password && errors.password?.type !== 'required') && <p className="text-red-500 pt-2">{authError.password}</p>}
                    </div>

                    <input className="my-button mt-3" type="submit" value='Login' />
                </form>
                <p className="pt-5 text-center">Or login with</p>
                <div className="flex justify-center pt-3 text-white text-2xl gap-3">
                    <button onClick={handleGoogleLogin} className="bg-blue-500 rounded-full px-2 py-2">
                        <FaGoogle></FaGoogle>
                    </button>
                    <button className="bg-gray-500 rounded-full px-2 py-2">
                        <FaGithub></FaGithub>
                    </button>
                </div>
                <p className="text-center pt-4">Don't have an accout? <Link className="text-[#03e9a4]" to='/register'>Register</Link></p>
            </div>
            <img src={loginImg} alt="" />
        </div>
    );
};

export default Login;


