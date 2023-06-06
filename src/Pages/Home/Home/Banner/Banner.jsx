import { Swiper, SwiperSlide } from 'swiper/react';
import img from '../../../../assets/banner.png';
import slider1 from '../../../../assets/banner/slider-1.png'
import slider2 from '../../../../assets/banner/slider-2.png'
import slider3 from '../../../../assets/banner/slider-3.png'
import slider4 from '../../../../assets/banner/slider-4.png'

import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import "swiper/css/pagination";

const Banner = () => {
    return (
        <div className='h-[100vh] text-white bg-center bg-cover' style={{ backgroundImage: `url(${img})` }}>
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3000
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className='h-full'
            >
                <SwiperSlide>
                    <div className='h-full flex items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-5xl'>Unleash Your Creativity in Fashion Design</h1>
                            <p>Discover your passion for fashion design through hands-on classes, expert guidance, and exciting projects. Immerse yourself in a creative environment where you can unleash your unique style and bring your fashion dreams to life.</p>
                            <button className='my-button'>Join Now</button>
                        </div>
                        <img src={slider3} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='h-full flex items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-5xl'>Learn from Industry Experts</h1>
                            <p>Gain valuable insights and skills from experienced fashion professionals.
                                Content: Our camp offers the opportunity to learn directly from renowned fashion designers, stylists, and industry experts. Get insider knowledge, learn industry techniques, and be inspired by their experiences. Prepare yourself for a successful future in the fashion world.
                            </p>
                            <button className='my-button'>Join Now</button>
                        </div>
                        <img src={slider1} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='h-full flex items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-5xl'>Join a Creative Community</h1>
                            <p>Join a vibrant community of fashion enthusiasts, collaborate with fellow designers, and form lifelong friendships with people who share your passion. Experience the joy of being part of a supportive and creative network.
                            </p>
                            <button className='my-button'>Join Now</button>
                        </div>
                        <img src={slider4} alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='h-full flex items-center justify-between my-container gap-4'>
                        <div className='space-y-4'>
                            <h1 className='text-5xl'>Create Fashion that Makes a Statement</h1>
                            <p> Explore various design techniques, experiment with fabrics, and develop your own unique style. At our summer camp, you'll learn to create fashion that leaves a lasting impression and makes a statement.
                            </p>
                            <button className='my-button'>Join Now</button>
                        </div>
                        <img src={slider2} alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;