import { Swiper, SwiperSlide } from 'swiper/react';
import slider1 from '../../../../assets/banner/slider-1.png'
import slider2 from '../../../../assets/banner/slider-2.png'
import slider3 from '../../../../assets/banner/slider-3.png'
import slider4 from '../../../../assets/banner/slider-4.png'

import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import "swiper/css/pagination";
import { Link } from 'react-router-dom';

const Banner = () => {


    return (
        <div className='lg:h-[90vh] flex items-center pt-20 bg-center bg-cover'>
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className='h-full lg:mt-10'
            >
                <SwiperSlide className='w-full mb-6'>
                    <div className='h-full flex flex-col-reverse lg:flex-row items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-3xl lg:text-5xl'>Unleash Your Creativity in Fashion Design</h1>
                            <p>Discover your passion for fashion design through hands-on classes, expert guidance, and exciting projects. Immerse yourself in a creative environment where you can unleash your unique style.</p>
                            <button className='my-button'>
                                <Link to='/register'>Join Now</Link>
                            </button>
                        </div>
                        <img src={slider3} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide className='w-full'>
                    <div className='h-full flex flex-col-reverse lg:flex-row items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-3xl lg:text-5xl'>Learn from Industry Experts</h1>
                            <p>
                                Our camp offers the opportunity to learn directly from renowned fashion designers, stylists, and industry experts. Get insider knowledge, learn industry techniques, and be inspired by their experiences. Prepare yourself for a successful future in the fashion world.
                            </p>
                            <button className='my-button'>
                                <Link to='/register'>Join Now</Link>
                            </button>
                        </div>
                        <img src={slider1} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide className='w-full'>
                    <div className='h-full flex flex-col-reverse lg:flex-row items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-3xl lg:text-5xl'>Join a Creative Community</h1>
                            <p>Join a vibrant community of fashion enthusiasts, collaborate with fellow designers, and form lifelong friendships with people who share your passion. Experience the joy of being part of a supportive and creative network.
                            </p>
                            <button className='my-button'>
                                <Link to='/register'>Join Now</Link>
                            </button>
                        </div>
                        <img src={slider4} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide className='w-full'>
                    <div className='h-full flex flex-col-reverse lg:flex-row items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-3xl lg:text-5xl'>Create Fashion that Makes a Statement</h1>
                            <p> Explore various design techniques, experiment with fabrics, and develop your own unique style. At our summer camp, you'll learn to create fashion that leaves a lasting impression and makes a statement.
                            </p>
                            <button className='my-button'>
                                <Link to='/register'>Join Now</Link>
                            </button>
                        </div>
                        <img src={slider2} alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div >
    );
};

export default Banner;