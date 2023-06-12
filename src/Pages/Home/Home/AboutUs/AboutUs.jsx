import SectionHeading from '../../../../Components/SectionHeading';

import aboutImg from '../../../../assets/about.png'

const AboutUs = () => {

    return (
        <div className='my-container pt-20'>
            <SectionHeading heading='about us'></SectionHeading>
            <div className='grid lg:grid-cols-2 md:grid-cols-1 lg:gap-20 gap-6 items-center'>
                <img className='md:w-[60%] mx-auto lg:w-full' src={aboutImg} alt="" />
                <p className='text-lg'>At <span className='italic font-bold'>CoutureCamp</span>, we are passionate about fashion and dedicated to nurturing the next generation of designers. With our expert-led workshops, hands-on training, and immersive experiences, we provide aspiring fashion enthusiasts with the tools and knowledge to unleash their creativity and refine their skills. From exploring the art of garment construction to mastering fashion illustration, our campers gain valuable insights into the world of fashion design. Join us for an unforgettable journey where you'll discover your unique style, connect with like-minded individuals, and take your first steps towards a successful career in the fashion industry!</p>
            </div>
        </div>
    );
};

export default AboutUs;