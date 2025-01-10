import { css } from '@emotion/react'
import { FunctionComponent, useEffect } from 'react'
import SliceHome from './component/slice/slice.component'
import FeaturedCategory from './component/list-banner/list-banner.component'
import { useProductRedux } from '../../redux/hook/useProductReducer'
import { Skeleton } from 'antd'
import NewProduct from './component/new-product/new-product.component'
import SaleProduct from './component/sale-product/sale-product.component'
import ListBanner from './component/list-banner/list-banner.component'
import Gallery from './component/gallery/gallery.component'
import { Link } from 'react-router-dom'
import TruthValue from './component/truth-value/truth-value.component'

interface MainHomeProps {
  props?: any
}

const MainHome: FunctionComponent<MainHomeProps> = () => {
  const {
    data: { products },
    actions
  } = useProductRedux()
  useEffect(() => {
    actions.getAllProduct()
  }, [])
  return (
    <div css={cssmain}>
      <div className='item-list-slider'>
        <SliceHome />
      </div>
      <div className='item-list-slider'>
        {products.length > 0 ? (
          <div className='item-list-slider'>
            <NewProduct />
          </div>
        ) : (
          <Skeleton active />
        )}
      </div>
      <div className='item-list-slider'>
        {products.length > 0 ? (
          <div className='item-list-slider'>
            <SaleProduct />
          </div>
        ) : (
          <Skeleton active />
        )}
      </div>
      <div className='item-list-slider relative max-sm:hidden mt-[80px]'>
        <img
          className='banner-img'
          src='https://im.uniqlo.com/global-cms/spa/res619b373fb11838f1eb9998aabc6746a8fr.jpg'
          alt=''
        />
        <div className='banner-overlay'>
          <h1>BỘ SƯU TẬP White Moutainering Thu/Đông 2023</h1>
          <p>
            Trang phục LifeWear lấy cảm hứng từ phong cách sống thành thị mới <br /> Mở Bán Vào 13/10
          </p>
          <Link to={'#'}> XEM THÊM</Link>
        </div>
      </div>
      <div className='item-list-slider max-sm:hidden'>
        <ListBanner />
      </div>
      <div className='item-list-slider'>
        <TruthValue />
      </div>
      <div className='item-list-slider max-sm:hidden'>
        <Gallery />
      </div>
    </div>
  )
}

export default MainHome

const cssmain = css`
  height: 100%;
  position: sticky;
  top: 0px;
  width: 90%;
  margin: auto;
  overflow-x: hidden;
  .item-list-slider {
    margin-bottom: 20px;
  }
  .banner-img {
    border-radius: 40px 0;
  }
  .banner-overlay {
    position: absolute;
    top: 30%;
    left: 20px;
    max-width: 600px;
    width: 100%;
  }
  .banner-overlay h1 {
    color: #fff;
    font-size: 34px;
    font-weight: 700;
    line-height: 47px;
    white-space: pre-line;
    min-height: 47px;
    width: 100%;
  }
  .banner-overlay p {
    font-size: 15px;
    font-weight: 400;
    margin-top: 12px;
    white-space: pre-line;
    line-height: 23px;
    color: #fff;
  }
  .banner-overlay a {
    font-size: 15px;
    margin-top: 24px;
    background-color: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 255, 255, 0.85);
    display: inline-flex;
    margin-left: auto;
    margin-right: auto;
    min-width: 100px;
    padding: 3px 4%;
    width: auto;
    cursor: pointer;
    font-weight: 700;
    line-height: 3.1875;
  }
  @media (min-width: 0) and (max-width: 739px) {
    width: 100%;
  }
`
