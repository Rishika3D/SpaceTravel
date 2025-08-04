import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export const Carousel = () => {
  const data = [
    {
      img: 'https://source.unsplash.com/600x400/?planet',
      title: 'Planets',
      desc: 'Explore the wild worlds of our solar system — from Mercury to Neptune.',
      link: '/planets'
    },
    {
      img: 'https://source.unsplash.com/600x400/?constellation',
      title: 'Constellations',
      desc: 'Decode the stories written in the stars. Navigate myths and legends.',
      link: '/constellations'
    },
    {
      img: 'https://source.unsplash.com/600x400/?galaxy',
      title: 'Galaxies',
      desc: 'Dive into the cosmic whirlpools of billions of stars and dark matter.',
      link: '/galaxies'
    }
  ];

  return (
    <div className="px-4 py-6">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                <a
                  href={item.link}
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
