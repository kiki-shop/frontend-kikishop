import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import { SwiperSlide } from 'swiper/react'
import SwiperListTwoProduct from '~/app/component/stack/swiper-list/swiperList-twoProduct.component'

interface ListBannerProps {
  props?: any
}

const ListBanner: FunctionComponent<ListBannerProps> = () => {
  const arrayImage = [
    '//im.uniqlo.com/global-cms/spa/res06eabfaad2f4206fde4dda12c9d56971fr.jpg',
    '//im.uniqlo.com/global-cms/spa/res7069cceacb913243403348663e5ebc1efr.jpg',
    '//im.uniqlo.com/global-cms/spa/res2a71b0a0ef6980ccd4fd45a5bb1c1667fr.jpg',
    '//im.uniqlo.com/global-cms/spa/reseb5aa1d7f173ac9df2887edd3d85c3acfr.jpg'
  ]
  return (
    <div className='mt-4 mb-[107px]'>
      <SwiperListTwoProduct>
        {arrayImage?.map((item, index) => (
          <SwiperSlide key={index}>
            <img css={cssImg} src={item} alt='' className='w-full h-full rou' />
          </SwiperSlide>
        ))}
      </SwiperListTwoProduct>

      <hr className=' text-gray h-[4px] mt-14' />
    </div>
  )
}

export default ListBanner

const cssImg = css`
  border-radius: 50px 0;
`
