import React, { FunctionComponent, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { css } from '@emotion/react'
import { useProductRedux } from '~/app/modules/client/redux/hook/useProductReducer'

interface DemoCarouselProps {}
const PreviewImg: FunctionComponent<DemoCarouselProps> = () => {
  const onClickItem = () => {}
  const [showThumbs, setShowThumbs] = useState(true)
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setShowThumbs(!isMobile)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const {
    data: { product: productDetail }
  } = useProductRedux()
  return (
    <div css={cssPreviewImg}>
      <Carousel
        autoPlay={true}
        onClickItem={onClickItem}
        showThumbs={showThumbs}
        showArrows={false}
        swipeable={true}
        className='carousel-container'
      >
        {productDetail?.images?.map((item: any, index: any) => (
          <div className='img' key={index}>
            <img className='imgchildren' src={item.response || item.url} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default PreviewImg

const cssPreviewImg = css`
  .carousel .thumb {
    height: 112px;
  }
  .imgchildren {
    width: 100%;
  }
  .carousel-root {
    width: 100%;
  }
  .list_img {
    width: 100%;
  }
  .carousel .slider-wrapper {
    overflow: hidden;
  }
  .carousel .slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .carousel .carousel-container {
    border: none !important;
  }
`
