import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

import m1 from '../images/mh1.jpg';
import m2 from '../images/mh2.jpg';
import m3 from '../images/mh3.jpg';

// Custom CSS for yellow pagination bullets
import './imageSlider.css';  // You'll need to create this CSS file

const styles = {
  container: {
    maxWidth: '100%',
    padding: '0 10px',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '20rem',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  swiperContainer: {
    paddingBottom: '40px',
    paddingTop: '20px',
  },
};

const ImageSlider = () => {
  return (
    <div style={styles.container}>
      <Swiper
        style={styles.swiperContainer}
        modules={[Pagination, EffectCoverflow, Autoplay]}
        spaceBetween={0}
        slidesPerView={2.5}
        centeredSlides={true}
        initialSlide={1}
        loop={true}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: true,
        }}
        speed={800} // Smoother transition
        autoplay={{
          delay: 2000, // Auto slide every 2 seconds
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="custom-pagination-swiper" // Custom class for styling
      >
        <SwiperSlide>
          <img src={m1} alt="Slide 1" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={m2} alt="Slide 2" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={m3} alt="Slide 3" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={m1} alt="Slide 4" style={styles.image} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={m2} alt="Slide 5" style={styles.image} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;