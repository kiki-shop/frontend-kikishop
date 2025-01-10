import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import { SwiperSlide } from 'swiper/react'
import SwiperListFiveProduct from '~/app/component/stack/swiper-list/swiperList-fiveProduct.component'

interface GalleryProps {
  props?: any
}

const Gallery: FunctionComponent<GalleryProps> = () => {
  const arrayImage = [
    'https://image.uniqlo.com/UQ/ST3/jp/imagesother/fleece/23fw/img/gl/men/hero_01_sp.jpg?20230828001828001',
    'https://im.uniqlo.com/global-cms/spa/res9dbe1e890e1ca551057f514aa3d655dbfr.jpg',
    'https://image.uniqlo.com/UQ/ST3/jp/imagesother/fleece/23fw/img/gl/women/hero_01_sp.jpg?20230828001',
    '//im.uniqlo.com/global-cms/spa/resa7cea7163e6e3662b661f11ed870b61afr.jpg',
    '//im.uniqlo.com/global-cms/spa/rescf284a80bab0477bee4dd5c3108a2b94fr.jpg',
    'https://im.uniqlo.com/global-cms/spa/res3181e9e7dd613e69e4d8d78e29868053fr.jpg',
    'https://im.uniqlo.com/global-cms/spa/resd3b382c8687325c63a405ffacdda6626fr.jpg',
    '//im.uniqlo.com/global-cms/spa/res51c242fdc346e8db8f96170278cc5257fr.jpg'
  ]
  return (
    <div className='mt-[80px]' css={cssGallery}>
      <h3 className='text-center text-[30px]'>PHÒNG TRƯNG BÀY</h3>
      <p className='text-center titles-desc'>
        Một năm 2020 không hoàn hảo, với thật nhiều thử thách, vụn vỡ cuối cùng đã sắp qua đi. Đã đến lúc nàng được nâng{' '}
        <br />
        ly chúc mừng cho tinh thần mạnh mẽ, lạc quan của bản thân
      </p>
      <SwiperListFiveProduct>
        {arrayImage?.map((item, index) => (
          <SwiperSlide key={index}>
            <img css={cssImg} src={item} alt='' className='w-full h-full rou' />
          </SwiperSlide>
        ))}
      </SwiperListFiveProduct>
    </div>
  )
}

export default Gallery
const cssGallery = css`
  h1 {
    font-weight: 600;
    letter-spacing: 1px;
  }
  .titles-desc {
    font-size: 20px;
    font-family: 'MuliDisplayVN', sans-serif;
    font-weight: 300;
    color: #333;
    margin: 20px auto 40px;
  }
`
const cssImg = css`
  width: 246px;
  height: 246px;
`
