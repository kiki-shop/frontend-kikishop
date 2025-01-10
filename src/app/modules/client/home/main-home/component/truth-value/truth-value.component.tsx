import { css } from '@emotion/react'
import { FunctionComponent } from 'react'
import { SwiperSlide } from 'swiper/react'
import SwiperListFiveProduct from '~/app/component/stack/swiper-list/swiperList-fiveProduct.component'

interface TruthValueProps {
  props?: any
}

const TruthValue: FunctionComponent<TruthValueProps> = () => {
  const listTruthValue = [
    {
      id: 1,
      name: 'Sang Trọng',
      img: 'https://pubcdn.ivymoda.com/files/news/2023/10/05/bf77ab02aa0d76266784c54c5c23142f.jpg'
    },
    {
      id: 2,
      name: 'Đẳng Cấp',
      img: 'https://pubcdn.ivymoda.com/files/news/2023/10/05/eafa905f60a379488f3dcd322bd549d5.jpg'
    },
    {
      id: 3,
      name: 'Thời Thượng',
      img: 'https://im.uniqlo.com/global-cms/spa/resb997dad121efc1a79b5add0a372f3737fr.jpg'
    },
    {
      id: 4,
      name: 'Lôi Cuốn',
      img: '//im.uniqlo.com/global-cms/spa/res9c6e0c00d9100404d60bdc1664e078dcfr.jpg'
    }
  ]
  return (
    <div className='mt-4' css={cssValue}>
      <h3 className='text-center max-sm:text-[18px] text-[30px] pb-12'>LỜI BÀY TỎ TỪ GIÁ TRỊ ĐÍCH THỰC</h3>
      <div className='list-value max-sm:hidden'>
        {listTruthValue.map((value: any) => (
          <div key={value.id}>
            <div className='img-block'>
              <img src={value.img} alt='' />
            </div>
            <p>{value.name}</p>
          </div>
        ))}
      </div>
      <div className='list-value-mobile'>
        {listTruthValue.slice(0,2).map((value: any) => (
          <div key={value.id}>
            <div className='img-block'>
              <img src={value.img} alt='' />
            </div>
            <p>{value.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TruthValue

const cssValue = css`
  h3 {
    text-align: center;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    line-height: 32px;
    font-family: 'Montserrat';
    color: #221f20;
    margin-top: 40px;
  }
  .list-value {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 24px;
  }
  .list-value-mobile {
    display: none;
  }
  .img-block {
    height: 256px;
    width: 327px;
    overflow: hidden;
    border-radius: 50px 0;
  }
  .list-value p {
    text-align: center;
    margin-top: 12px;
    font-weight: 550;
    font-size: 16px;
    letter-spacing: 0.5px;
  }
  @media screen and (max-width: 640px){
    .list-value{
      display: none;
    }
    .list-value-mobile {
      margin: 0 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 15px;
    }
    .img-block {
      height: fit-content;
      width: 175px;
      overflow: hidden;
      border-radius: 20px 0;
    }
    .list-value-mobile p {
      text-align: center;
      margin-top: 10px;
      font-weight: 550;
      font-size: 12px;
      letter-spacing: 0.5px;
    }
}
`
