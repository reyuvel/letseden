import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import slide_image_1 from '../components/Connect.jpg';
import slide_image_2 from '../components/edenlogo.png';
import slide_image_3 from '../components/tellus.png';
import slide_image_4 from '../components/Connect.jpg';
import slide_image_5 from '../components/edenlogo.png';
import slide_image_6 from '../components/edenlogo.png';
import slide_image_7 from '../components/edenlogo.png';




// Add your styles
import '../css/Testimony.css';

const Testimony = () => {
  return (

    <section id='testimony'>
      <h3 className='text-center mb-0 custom-heading'>Testimony</h3>
      <div className="container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3} // Show 3 slides at a time (center + two sides)
          spaceBetween={0}
          autoplay={{ delay: 4000 }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container"
        >
          <SwiperSlide>
            <img src={slide_image_1} alt="slide_image_1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_2} alt="slide_image_2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_3} alt="slide_image_3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_4} alt="slide_image_3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_5} alt="slide_image_3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={slide_image_6} alt="slide_image_3" />
          </SwiperSlide><SwiperSlide>
            <img src={slide_image_7} alt="slide_image_3" />
          </SwiperSlide>
          {/* Add more SwiperSlides as needed */}
        </Swiper>


      </div>

    </section>

  );
};

export default Testimony;
