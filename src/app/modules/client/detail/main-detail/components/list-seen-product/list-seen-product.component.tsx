import { FunctionComponent, useEffect } from 'react'
import { css } from '@emotion/react'
import ItemProduct from '~/app/component/parts/itemproduct/itemproduct.component'
import { SwiperSlide } from 'swiper/react'
import SwiperListFiveProduct from '~/app/component/stack/swiper-list/swiperList-fiveProduct.component'
import { useProductRedux } from '~/app/modules/client/redux/hook/useProductReducer'
import { Link } from 'react-router-dom'

interface ListSeenProduct {
    props?: any
}

const ListSeenProduct: FunctionComponent<ListSeenProduct> = () => {
    const { data: { products }, actions } = useProductRedux()
    useEffect(() => {
        actions.getAllProduct()
    }, [])
    return (
        <div className='p-5'>
            <h2 className='text-center font-semibold mb-11 text-[32px] tracking-wider font-sans'>Sản phẩm đã xem</h2>
            <div>
                <SwiperListFiveProduct css={cssSlide}>
                    {products?.slice(0, 10).map((item: any) => (
                        <SwiperSlide key={item._id}>
                            <Link to={`/detail/${item._id}`}>
                                <ItemProduct className='product' itemProduct={item} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </SwiperListFiveProduct>
            </div>
        </div>
    )
}

export default ListSeenProduct

const cssSlide = css`
`