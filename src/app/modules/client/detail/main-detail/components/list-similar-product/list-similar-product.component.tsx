import { FunctionComponent, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import ItemProduct from '~/app/component/parts/itemproduct/itemproduct.component'
import { SwiperSlide } from 'swiper/react'
import SwiperListFiveProduct from '~/app/component/stack/swiper-list/swiperList-fiveProduct.component'
import { useProductRedux } from '~/app/modules/client/redux/hook/useProductReducer'
import { Link } from 'react-router-dom'

interface ListSimilarProduct {
  props?: any
}

const ListSimilarProduct: FunctionComponent<ListSimilarProduct> = () => {
  const { data: { products, product }, actions } = useProductRedux()
  const [newData, setNewData] = useState<any>([])

  useEffect(() => {
    actions.getAllProduct()
    const dataCateProduct = products?.filter((item: any) =>
      item?.categoryId?._id == product?.categoryId?._id
    )
    setNewData(dataCateProduct)

  }, [product])
console.log(newData)
  return (
    <div className='p-5'>
      <h2 className='text-center font-semibold mb-11 text-[32px] tracking-wider font-sans'>Sản phẩm tương tự</h2>
      <div>
        <SwiperListFiveProduct css={cssSlide}>
          {newData?.map((item: any) => (
            <SwiperSlide key={item?._id}>
              <Link to={`/detail/${item?._id}`}>
                <ItemProduct className='product' itemProduct={item} />
              </Link>
            </SwiperSlide>
          ))}
        </SwiperListFiveProduct>
      </div>
    </div>
  )
}

export default ListSimilarProduct

const cssSlide = css`
`