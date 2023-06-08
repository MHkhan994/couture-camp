import { useForm } from "react-hook-form";
import loginImg from '../../assets/login.png'
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        login(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                const user = { email: result.user.email, name: result.user.displayName }
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('access-token', data.token)
                        navigate('/')
                    })
            })
            .catch(error => console.log(error))
    };

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
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password', { required: true })} type="password" placeholder="Your Password" className="input shadow-sm input-bordered rounded-[20px]" />
                        {errors.password?.type === 'required' && <p role="alert" className="text-red-500 pt-2">Please type your password</p>}
                    </div>

                    <input className="my-button mt-3" type="submit" value='Login' />
                </form>
                <p className="pt-5 text-center">Or login with</p>
                <div className="flex justify-center pt-3 text-white text-2xl gap-3">
                    <button className="bg-blue-500 rounded-full px-2 py-2">
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