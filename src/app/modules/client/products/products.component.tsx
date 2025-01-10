import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import TitleProducts from './titleProducts/titleProducts.component'
import SidebarProducts from './sidebarProducts/sidebarProducts.component'
import ListProducts from './listProduct/listProducts.component'
import { useProductRedux } from '../redux/hook/useProductReducer'
import { searchProduct } from '../../admin/product/service/product.service'


interface ProductProps {
  props?: any
}

const Products: FunctionComponent<ProductProps> = () => {
  let keyword = new URLSearchParams(location.search).get('q')
  const [listColor, setListColor] = useState<any>()

  const {
    data: { products },
    actions
  } = useProductRedux()
  const [data, setData] = useState<any>([])
  const [defaultData, setDefaultData] = useState<any>([])
  const [searchError, setSearchError] = useState("")
  useEffect(() => {
    actions.getAllProduct()
  }, [])
  useEffect(() => {
     if (!keyword || keyword === "") {
      const sortedData = [...products].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setData(sortedData)
    }
  }, [products])
  useEffect(() => {
    setData(products)
  }, [keyword])
  useEffect(() => {
    if (keyword || keyword == "") {
      searchProduct(keyword).then(
        (res: any) => { setData(res.data), setDefaultData(res.data), setSearchError("") },
        (err: any) => {
          setSearchError(err.response.data.message)
        }
      )
    }
  }, [keyword])
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  },[data])
  const handleDataUpdate = (id: any) => {
    if (!keyword) {
      const listPro = products.filter((pro: any) => pro.categoryId._id === id)
      setData(listPro)
      if (id === 'all') setData(products)
    }
    else {
      const listPro = defaultData.filter((pro: any) => pro.categoryId._id === id)
      setData(listPro)
      if (id === 'all') setData(defaultData)
    }
  }
  const handleSortPrice = (type: any) => {
    if (type == 'decending') {
      const listPrice = data.map((p: any) => p.price).sort((a: any, b: any) => b - a)
      const listSorted: any = []
      const sort = listPrice.map((price: any) =>
        products.map((pro: any) => (price === pro.price ? listSorted.push(pro) : null))
      )
      setData(listSorted)
    } else if (type == 'acending') {
      const listPrice = data.map((p: any) => p.price).sort((a: any, b: any) => a - b)
      const listSorted: any = []
      const sort = listPrice.map((price: any) =>
        products.map((pro: any) => (price === pro.price ? listSorted.push(pro) : null))
      )
      setData(listSorted)
    }
  }
  const handleGetPrice = (price: any) => {
    if (!keyword) {
      const rangePro = products.filter((pro: any) => {
        if (price[1]) {
          return pro.price >= price[0] && pro.price <= price[1]
        } else {
          return pro.price >= price[0]
        }
      })
      setData(rangePro)
    }
    else {
      const rangePro = defaultData.filter((pro: any) => {
        if (price[1]) {
          return pro.price >= price[0] && pro.price <= price[1]
        } else {
          return pro.price >= price[0]
        }
      })
      setData(rangePro)

    }

  }
  const reverseProducts = (type: string) => {
    if (type === 'new') {
      const currentDate: Date = new Date();

      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        const timeDifferenceA = currentDate.getTime() - dateA.getTime();
        const timeDifferenceB = currentDate.getTime() - dateB.getTime();

        return timeDifferenceA - timeDifferenceB;
      });

      setData(sortedData);

    }
  };
  const handleSortSize = (size: any) => {
    const sorted: any = []
    products.map((item: any) => {
      item.listQuantityRemain.map((list: any) => {
        if (list.nameSize === size) {
          sorted.push(item)
        }
      })
    })
    const uniqueItems = sorted.reduce((acc: any[], item: any) => {
      if (!acc.some((obj) => obj._id === item._id)) {
        acc.push(item)
      }
      return acc
    }, [])
    setData(uniqueItems)
  }
  useEffect(() => {
    const listColor: any = []
    products.map((item: any) => {
      item.listQuantityRemain.map((list: any) => {
        listColor.push(list.colorHex)
      })
    })
    const listUniqueColor = listColor.reduce((acc: any[], obj: any) => {
      if (!acc.some((item) => item === obj)) {
        acc.push(obj)
      }
      return acc
    }, [])
    setListColor(listUniqueColor)
  }, [products])
  const handleSortColor = (color: any) => {
    const sorted: any = []
    products.map((item: any) => {
      item.listQuantityRemain.map((list: any) => {
        if (list.colorHex === color) {
          sorted.push(item)
        }
      })
    })
    const uniqueItems = sorted.reduce((acc: any[], item: any) => {
      if (!acc.some((obj) => obj._id === item._id)) {
        acc.push(item)
      }
      return acc
    }, [])
    setData(uniqueItems)
  }
 
  return (
    <div css={cssProduct}>
      <TitleProducts>Tất cả sản phẩm</TitleProducts>
      <div className='title relative'>
        <h1 className='text-title absolute'>TẤT CẢ SẢN PHẨM </h1>
      </div>

      <div className='flex mt-[48px]'>
        <SidebarProducts
          sortColor={handleSortColor}
          data={data}
          listColor={listColor}
          onDataUpdate={handleDataUpdate}
          getPrices={handleGetPrice}
          sortPrices={handleSortPrice}
          sortNewProduct={reverseProducts}
          sortSize={handleSortSize}
        />
        {!searchError && <ListProducts data={data.filter((product:any)=> product.categoryId._id !== '656b0b5bf0981478cdf1a957')} />}
        {searchError && <h1 className='text-[16px] font-semibold'>{searchError}!</h1>}
      </div>
    </div>
  )
}

export default Products

const cssProduct = css`
  max-width: 1440px;
  box-sizing: border-box;
  margin: auto;
  justify-content: center;
  .title {
    margin-bottom: 32px;
  }
  .text-title {
    right: 28%;
    font-weight: 300;
    font-size: 20px;
    line-height: 32px;
    color: #221f20;
    padding: 12px 40px 12px 16px;
    text-transform: uppercase;
  }
  @media screen and (max-width: 640px){
    .text-title {
      right: 18%;
    }
   
}
`
