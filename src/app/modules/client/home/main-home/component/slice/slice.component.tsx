import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'
interface SliceHomeProps {
  props?: any
}

const SliceHome: FunctionComponent<SliceHomeProps> = () => {
  const arrayImage = [
    'https://pubcdn.ivymoda.com/files/news/2023/12/06/14278a699545b1d2a97c85c9fbcf4cee.jpg',
    'https://pubcdn.ivymoda.com/files/news/2023/12/02/bb2bdd4a04fb1200d172f4841ba23110.jpg',
    'https://pubcdn.ivymoda.com/files/news/2023/11/30/6e15c4ed40d8434ef1e9f9f2b1f91aeb.jpg'

  ]
  return (
    <>
      <div className=' flex justify-between'>
        <div css={cssSlider}>
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            className='mySwiper'
          >
            {arrayImage?.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} alt='' className='w-full h-full object-contain ' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default SliceHome

const cssSlider = css`
  border-radius: 80px 0;
  width: 100%;
  overflow: hidden;
  .swiper-button-prev {
    color: white;
  }
  .swiper-button-next {
    color: white;
  }
  @media screen and (max-width: 640px){
    .swiper-button-prev::after {
      font-size:16px;
    }
    .swiper-button-next::after {
      font-size: 16px;
    }
}
  .swiper-pagination-bullet-active {
    background: #fff;
  }
  @media (min-width: 0) and (max-width: 739px) {
    flex-basis: unset;
    margin: 10px;
  }
`
