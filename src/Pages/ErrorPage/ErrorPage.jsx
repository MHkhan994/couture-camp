import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='relative'>
            <img className='h-screen w-full object-cover' src="https://i.ibb.co/gz1bxh6/5313764.png" alt="" />
            <div className=' px-3 absolute top-0 left-0 w-full h-full flex flex-col gap-3 justify-center items-center pt-20'>
                <p className='text-center'>The page you are trying to find does not exist.</p>
                <Link to='/' className='my-button'>Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;