import img from '../assets/page-top.png'

const PageBanner = ({ heading }) => {
    return (
        <div className='pt-10' style={{ background: `url(${img})`, backgroundSize: 'cover' }}>
            <div className='lg:h-[60vh] md:h-[40vh] h-[80vh] flex justify-center items-center'>
                <h1 className='text-4xl font-semibold'>{heading}</h1>
            </div>
        </div>
    );
};

export default PageBanner;