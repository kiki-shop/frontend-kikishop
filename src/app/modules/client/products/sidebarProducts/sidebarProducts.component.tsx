import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { SiZenn } from 'react-icons/si'
import { MdOutlineAutorenew, MdOutlineWidgets } from 'react-icons/md'
import { GiPriceTag } from 'react-icons/gi'
import { ImStarEmpty } from 'react-icons/im'
import { GrFormFilter } from 'react-icons/gr'
import type { MenuProps } from 'antd'
import { Menu} from 'antd'
import { useCategoryRedux } from '../../redux/hook/useCategoryReducer'
import { IoIosHeartEmpty } from 'react-icons/io'
import { LiaSortAmountDownSolid, LiaSortAmountUpSolid } from 'react-icons/lia'
import { FiFilter } from 'react-icons/fi'
import { Button, Drawer } from 'antd';
interface SidebarProductsProps {
  props?: any
  data: any
  onDataUpdate: any
  getPrices: any
  sortPrices: any
  sortNewProduct :any
  sortSize:any
  sortColor: any
  listColor: any
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']
const SidebarProducts: FunctionComponent<SidebarProductsProps> = (props) => {
  const [colorSelected, setColorSelected] = useState<any>()
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    };
  const { data, onDataUpdate, getPrices, sortPrices,sortNewProduct,sortSize , sortColor,
    listColor} = props
  const {
    data: { categorys },
    actions
  } = useCategoryRedux()
  useEffect(() => {
    actions.getAllcategory()
  }, [data])
  const getAllcategory = (id: any) => {
    onDataUpdate(id)
    onClose()
  }
  const getPrice = (price: number, toPrice?: number) => {
    const rangePrice = [price, toPrice]
    getPrices(rangePrice)
    onClose()
  }
  const sortPrice = (type: string) => {
    sortPrices(type)
    onClose()
  }
  const sortNews = (type: string) => {
    sortNewProduct(type)
    onClose()
  }
  const items: MenuItem[] = [
    getItem(
      'Danh Mục',
      'sub1',
      <SiZenn />,
      [
        ...categorys.filter((cate:any)=> (cate?.status === true || cate._id !== '656b0b5bf0981478cdf1a957')).map((cate: any, key = 0) =>
          getItem(
            <div key={key + 1} onClick={() => {getAllcategory(cate._id)}}>
              {cate.name}
            </div>,
            `${key + 1}`
          )
        ),
        getItem(<div onClick={() => {getAllcategory('all')}}>Tất cả</div>, 10, <MdOutlineWidgets />)
      ]
    ),
    getItem(
      'Mức giá',
      'sub4',
      <GiPriceTag />,
      [
        getItem(
          <div onClick={() => getPrice(0, 1000000)} className='sideBar-price'>
            Dưới 1.000.000 đ
          </div>,
          'price1'
        ),
        getItem(
          <div onClick={() => getPrice(1000000, 2000000)} className='sideBar-price'>
            1.000.000đ -{`>`} 2.000.000đ
          </div>,
          'price2'
        ),
        getItem(
          <div onClick={() => getPrice(2000000, 6000000)} className='sideBar-price'>
            2.000.000đ -{`>`} 6.000.000đ
          </div>,
          'price3'
        ),
        getItem(
          <div onClick={() => getPrice(6000000)} className='sideBar-price'>
            Trên 6.000.000 đ
          </div>,
          'price4'
        )
      ]
    ),
    getItem(
      'Sắp xếp theo',
      'sub5',
      <GrFormFilter />,
      [
        getItem(<div className='sideBar-sort' onClick={() => sortNews('new')}>Mới nhất</div>, 'sort2', <MdOutlineAutorenew />),
        // getItem(<div className='sideBar-sort'>Được mua nhiều nhất</div>, 'sort3', <ImStarEmpty />),
        // getItem(<div className='sideBar-sort'>Được yêu thích nhất</div>, 'sort4', <IoIosHeartEmpty />),
        getItem(
          <div className='sideBar-sort' onClick={() => sortPrice('decending')}>
            Giá cao đến thấp
          </div>,
          'sort5',
          <LiaSortAmountDownSolid />
        ),
        getItem(
          <div className='sideBar-sort' onClick={() => sortPrice('acending')}>
            Giá thấp đến cao
          </div>,
          'sort6',
          <LiaSortAmountUpSolid />
        )
      ]
    )
  ];
  const [openKeys, setOpenKeys] = useState([''])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const menuSize = [{id: 1,name: 'S'},{id: 2,name: 'M'},{id: 3,name: 'L'},{id: 4,name: 'XL'}]
  return (
    <div css={cssSidebar}>
            <div onClick={showDrawer}  className="filter sm:hidden fixed right-[0] h-[44px] text-[20px] text-white w-[50px] bg-[#ffaa00] rounded-l-[8px]">
      <FiFilter  />
      </div>
      <div className='sm:hidden' css={cssCustomAnt}> <Drawer contentWrapperStyle={{width: '320px'}} title="" placement="right" onClose={onClose} open={open}>
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 300, fontSize: 18, paddingRight: 20, marginRight: 20 }}
        items={items}
      />
      <div className="filter-size" css={cssFilterSize}>
        <div className="title">
          <p>Kích cỡ</p>
        </div>
        <div className="list-size max-sm:py-[16px]">
          {menuSize.map((size:any)=><div key={size.id} onClick={()=> sortSize(size.name)} className="size">{size.name}</div>)}
        </div>
      </div>
      <div className="filter-color" css={cssFilterSize}>
        <div className="title title-color">
          <p>Màu sắc</p>
        </div>
        <div className='color ' css={cssColor}>
       {listColor &&
         listColor?.map((item: any, key = 0) => {
           return (
             <div
               key={key++}
               className={`${
                 item === colorSelected ? 'colorSelected' : ''
               } product-color inline-flex items-center justify-center mr-2`}
             >
               <div
                 style={{ backgroundColor: `${item}` }}
                 onClick={() => {
                   sortColor(item)
                   setColorSelected(item)
                 }}
                 className={` h-[18px] w-[18px] rounded-[50%]`}
               ></div>
             </div>
           )
         })}
     </div>
      </div>
      </Drawer></div>
    <div className='max-sm:hidden' css={cssSidebarProductsProduct}>
      <Menu
        mode='inline'
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 300, fontSize: 18, paddingRight: 20, marginRight: 20 }}
        items={items}
      />
      <div className="filter-size" css={cssFilterSize}>
        <div className="title">
          <p>Kích cỡ</p>
        </div>
        <div className="list-size">
          {menuSize.map((size:any)=><div key={size.id} onClick={()=> sortSize(size.name)} className="size">{size.name}</div>)}
        </div>
      </div>
      <div className="filter-color" css={cssFilterSize}>
        <div className="title title-color">
          <p>Màu sắc</p>
        </div>
        <div className='color' css={cssColor}>
       {listColor &&
         listColor?.map((item: any, key = 0) => {
           return (
             <div
               key={key++}
               className={`${
                 item === colorSelected ? 'colorSelected' : ''
               } product-color inline-flex items-center justify-center mr-2`}
             >
               <div
                 style={{ backgroundColor: `${item}` }}
                 onClick={() => {
                   sortColor(item)
                   setColorSelected(item)
                 }}
                 className={` h-[18px] w-[18px] rounded-[50%]`}
               ></div>
             </div>
           )
         })}
     </div>
      </div>   
    </div>
    </div>
  )
}

export default SidebarProducts
const cssColor = css`
 width: 300px;
 .product-color {
   width: 24px;
   height: 24px;
   border-radius: 50%;
   border: 1px solid #d1d1d1;
   cursor: pointer;
   margin: 10px 10px 10px 0;
 }
 .colorSelected,.product-color:hover {
   border: 1px solid gray;
 }
`
const cssCustomAnt = css`
.ant-menu-submenu-title{
  background-color: transparent !important
}
.ant-menu-submenu-title:hover{
  background-color: transparent !important
}
.ant-menu-item-group-title,
.ant-menu-submenu-title {
  font-size: 18px;
  color: #000;
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}
.ant-menu-item {
  font-size: 17px;
}
.ant-menu-item:hover,
.ant-menu-item-selected {
  background-color: #ffaa00 !important;
  color: #fff !important;
}
.ant-menu-inline {
  background: transparent !important;
}
`
const cssSidebar = css`
.filter{
  cursor: pointer;
  z-index:1;
}
.filter svg{
  display: block;
  margin:10px auto
}
`
const cssFilterSize= css`
width: 300px;
padding-right: 20px;
.title{
  padding: 12px 16px;
  font-size: 20px;
  // background-color: rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  width:280px;
}
.title-color{
  margin-top: 24px;
}
.list-size{
  width: fit-content;
  margin:auto;
}
.size{
  display: inline-flex;
  font-size: 18px;
  width: 40px;
  height: 30px;
  justify-content:center;
  align-items: center;
  border: 1px solid #d1d1d1;
  margin-right: 10px;
  cursor: pointer;
  text-transform: uppercase;
}
.size:hover{
  border-color: #111
}
`
const cssSidebarProductsProduct = css`
position: sticky;
top:130px;
  .btn {
    min-width: 30px;
    height: 30px;
    border-radius: 50px;
    margin: 10px;
    padding: 3px;
    outline: none;
  }
  .ant-menu-item-group-title,
  .ant-menu-submenu-title {
    font-size: 18px;
    color: #000;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 12px;
  }
  .ant-menu-item {
    font-size: 17px;
  }
  .ant-menu-item:hover,
  .ant-menu-item-selected {
    background-color: #ffaa00 !important;
    color: #fff !important;
  }
  .ant-menu-inline {
    background: none !important;
  }
  .ant-menu-submenu-title{
    background-color: transparent !important
  }
  .ant-menu-submenu-title:hover{
    background-color: transparent !important
  }
`
const cssBtnFalse = css`
  width: 90px;
  padding: 15px;
  border-radius: 20px 0;
  color: black;
  background: white;
  :hover {
    color: white;
    background: black;
  }
`

const cssBtnTrue = css`
  width: 90px;
  padding: 20px;
  border-radius: 20px 0;
`
