import { css } from '@emotion/react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import InputComponent from '../../parts/input/input.component'
import { AiOutlineSearch, AiOutlineSetting, AiOutlineUserAdd } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCartRedux } from '~/app/modules/client/redux/hook/useCartReducer'
import { Link, useNavigate } from 'react-router-dom'
import { useProductRedux } from '~/app/modules/client/redux/hook/useProductReducer'
import { HiOutlineLogout } from 'react-icons/hi'
import { searchProduct } from '~/app/modules/admin/product/service/product.service'
import Marquee from 'react-fast-marquee'
import { getAllContent } from '~/app/api/content/content.api'
import { FiUserCheck } from 'react-icons/fi'
import { CheckAuth } from '~/app/container/check-auth/CheckAuth.component'
import { CgMenuLeftAlt } from 'react-icons/cg'
import { Drawer, Menu, MenuProps } from 'antd'
import { FaHome } from 'react-icons/fa'
import { TbBrandProducthunt } from 'react-icons/tb'
import { SiStylelint } from 'react-icons/si'
import { MdContactSupport } from 'react-icons/md'

interface HeaderComponentProps {
  props?: any
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
const HeaderComponent: FunctionComponent<HeaderComponentProps> = () => {
  const [content, setContent] = useState([])
  const [open, setOpen] = useState(false)
  const [openKeys, setOpenKeys] = useState([''])
  const cartAccounts = localStorage.getItem('cartNoAccount')
  const cartNoLogin = JSON.parse(cartAccounts || '[]')

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  useEffect(() => {
    getAllContent().then(({ data }) => setContent(data))
  }, [])
  let navigate = useNavigate()
  const {
    data: { carts, cartAccount },
    actions
  } = useCartRedux()
  useEffect(() => {}, [cartAccount])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchProducts, setSearchProducts] = useState<any[]>([])
  const [stateInput, setStateInput] = useState(false)
  const [searchError, setSearchError] = useState(false)
  let keyword = new URLSearchParams(location.search).get('q')
  const {
    data: { products },
    actions: productAction
  } = useProductRedux()
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    searchProduct(event.target.value).then(
      (res) => {
        setSearchProducts(res.data), setSearchError(false)
      },
      (err: any) => {
        setSearchError(true)
      }
    )
  }
  useEffect(() => {
    productAction.getAllProduct()
    if (stateInput && products.length != 0) {
      setStateInput(true)
    }
  }, [searchTerm])
  const handelSubmitData = () => {
    navigate(`/products?q=${searchTerm}`)
    if (keyword) {
      setSearchTerm(keyword)
    } else setSearchTerm('')
    setStateInput(false)
  }
  useEffect(() => {
    if (keyword) {
      setSearchTerm(keyword)
    } else setSearchTerm('')
  }, [keyword])

  const accessToken = localStorage.getItem('accessToken')
  const checkAuth = localStorage.getItem('checkAuth')
  useEffect(() => {
    if (accessToken) {
      actions.getAllCart()
    }
  }, [accessToken])

  const handleLoginLogout = () => {
    if (accessToken) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('emailUser')
      localStorage.removeItem('cartNoAccount')
      localStorage.removeItem('listSelectCart')
      localStorage.removeItem('checkAuth')
      localStorage.removeItem('userID')
      localStorage.removeItem('voucherCode')
      localStorage.removeItem('sale')
      localStorage.removeItem('total')
      actions.clearCartNoAccount()
      navigate('/customer/login')
    } else {
      navigate('/')
    }
  }

  const onClose = () => {
    setOpen(false)
  }
  const showDrawer = () => {
    setOpen(true)
  }
  let not: any
  const items: MenuItem[] = [
    getItem(
      <div className='item-menu'>
        {accessToken ? (
          <span className='px-4 text-black'>XIN CHÀO</span>
        ) : (
          <Link to={'/customer/login'}>Tài khoản</Link>
        )}
      </div>,
      'sub1',
      <FiUserCheck />,
      [
        getItem(
          <p className=' font-normal text-[15px] py-3 hover:text-red-500 p-6' onClick={handleLoginLogout}>
            Đăng xuất
          </p>,
          '12',
          <HiOutlineLogout />
        ),
        getItem(
          <Link onClick={onClose} to={'/manage'}>
            <p className=' font-normal text-[15px] py-3 p-6'>Quản lý </p>
          </Link>,
          '13',
          <AiOutlineSetting />
        ),
        getItem(
          <div onClick={onClose}>
            {checkAuth == 'ADMIN' && (
              <Link
                to={'/admin'}
                className='inline-block w-[100%] font-normal  mt-4 rounded-[8px] text-[15px] py-3 hover:bg-[#ffaa00] p-6'
              >
                Quản lý website
              </Link>
            )}
          </div>,
          '14'
        )
      ]
    ),
    getItem(
      <div onClick={onClose}>
        <Link className='hover:text-red-500' to={'/'}>
          Trang chủ
        </Link>
      </div>,
      'home',
      <FaHome />
    ),
    getItem(
      <div onClick={onClose}>
        <Link className='hover:text-red-500' to={'/products'}>
          Sản phẩm
        </Link>
      </div>,
      'sub2',
      <TbBrandProducthunt />
    ),
    getItem(
      <div onClick={onClose}>
        <Link className='hover:text-red-500' to={'/LifeStyle'}>
          LifeStyle
        </Link>
      </div>,
      'sub3',
      <SiStylelint />
    ),
    getItem(
      <div onClick={onClose}>
        <Link className='hover:text-red-500' to={'/Contacts'}>
          Liên hệ
        </Link>
      </div>,
      'sub4',
      <MdContactSupport />
    ),
    getItem(
      <div>
        <Link className='hover:text-red-500' to={''}>
          Về chúng tôi
        </Link>
      </div>,
      'sub5',
      null,
      [
        getItem(
          <Link onClick={onClose} to={'/general'} className='py-4 px-4 font-semibold'>
            {' '}
            Về KiKi
          </Link>,
          '9'
        ),
        getItem(
          <Link onClick={onClose} to={'/Community-Activities'} className='py-4 px-4 font-semibold'>
            {' '}
            Fashion Show
          </Link>,
          '10'
        ),
        getItem(
          <Link onClick={onClose} to={'/fashion-Show'} className='py-4 px-4 font-semibold'>
            {' '}
            Hoạt động cộng đồng
          </Link>,
          '11'
        )
      ]
    ),
    !accessToken
      ? getItem(
          <Link onClick={onClose} to={'/order-process'} className='py-4 px-4 font-semibold'>
            {' '}
            Kiểm tra đơn hàng
          </Link>,
          'sub5'
        )
      : not
  ]
  return (
    <div>
      <Drawer title='Menu' placement={'left'} onClose={onClose} open={open}>
        <div className='menu-drawer' css={cssMenuDrawer}>
          <Menu
            mode='inline'
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ width: '100%' }}
            items={items}
            className='mobile-menu'
          />
        </div>
      </Drawer>
      <div className='mx-auto top-0 flex items-center justify-between z-[99]  lg:px-[30px] px-[10px] w-[100%] bg-white fixed  h-[80px]'>
        <div className='md:hidden text-[22px]' onClick={showDrawer}>
          <CgMenuLeftAlt />
        </div>
        <div css={cssMenu} className='space-x-6'>
          <div>
            <Link className='hover:text-red-500' to={'/'}>
              TRANG CHỦ
            </Link>
          </div>
          <div>
            <Link className='hover:text-red-500' to={'/products'}>
              SẢN PHẨM
            </Link>
          </div>
          <div>
            <Link className='hover:text-red-500' to={'/LifeStyle'}>
              LifeStyle
            </Link>
          </div>
          <div>
            <Link className='hover:text-red-500' to={'/Contacts'}>
              LIÊN HỆ
            </Link>
          </div>
          <div className='title'>
            <Link className='hover:text-red-500' to={''}>
              VỀ CHÚNG TÔI
            </Link>
            <div className='news-product'>
              <Link to={'/general'} className='py-4 px-4 font-semibold'>
                {' '}
                Về KiKi
              </Link>
              <Link to={'/Community-Activities'} className='py-4 px-4 font-semibold'>
                {' '}
                Fashion Show
              </Link>
              <Link to={'/fashion-Show'} className='py-4 px-4 font-semibold'>
                {' '}
                Hoạt động cộng đồng
              </Link>
            </div>
          </div>
          {!accessToken && (
            <div>
              <Link className='hover:text-red-500' to={'/order-process'}>
                ĐƠN HÀNG CỦA BẠN
              </Link>
            </div>
          )}
        </div>
        <Link to={'/'}>
          <img
            src='https://res.cloudinary.com/dfj3obru8/image/upload/v1702389365/pwrxo90fsvgcfwxregrs.png'
            className='sm:w-[150px] max-h-[80px] max-w-[160px] sm:mr-12 '
          />
        </Link>
        <div className='flex align-items:center' css={cssWrapperMenu}>
          <div className='relative max-sm:hidden'>
            <InputComponent
              onChange={handleSearchInputChange}
              onClick={handelSubmitData}
              onFocus={() => setStateInput(true)}
              type='text'
              value={searchTerm || ''}
            />
            {stateInput && (
              <div className='absolute z-20 rounded-lg bg-white top-full left-0 w-full'>
                {!searchError &&
                  searchProducts?.slice(0, 10).map((product: any) => {
                    return (
                      <ul key={product?._id} className=''>
                        <Link
                          to={`/products?q=${product?.name}`}
                          onClick={() => {
                            setStateInput(false)
                          }}
                        >
                          <li className='px-5 py-3 flex justify-start hover:bg-gray-100'>
                            <div className='pl-[18px] pr-2'>
                              <AiOutlineSearch />
                            </div>
                            <div className='truncate'>{product?.name}</div>
                          </li>
                        </Link>
                      </ul>
                    )
                  })}
              </div>
            )}
          </div>
          {stateInput && <div css={cssDarkScreen} onClick={() => setStateInput(false)}></div>}
          <div className='item-menu'>
            <div className='icon px-3'>
              <FiUserCheck />
            </div>
            <div className='title'>
              {accessToken ? (
                <div>
                  <span className='px-4 text-black max-sm:hidden'>
                    XIN CHÀO
                    <ul className='links'>
                      <li>
                        <button className='w-[100%] text-left'>
                          <p
                            className=' font-normal text-[15px] py-3 hover:text-red-500 p-6'
                            onClick={handleLoginLogout}
                          >
                            {' '}
                            <HiOutlineLogout className='text-[20px]' />
                            Đăng xuất
                          </p>
                          <Link to={'/manage'}>
                            <p className=' font-normal text-[15px] py-3 p-6'>
                              <AiOutlineSetting className='text-[20px]' />
                              Quản lý{' '}
                            </p>
                          </Link>
                          {checkAuth == 'ADMIN' && (
                            <Link
                              to={'/admin'}
                              className='inline-block w-[100%] font-normal bg-black mt-4 rounded-[8px] text-white text-[15px] py-3 hover:bg-[#ffaa00] p-6'
                            >
                              Quản lý website
                            </Link>
                          )}
                        </button>
                      </li>
                    </ul>
                  </span>
                </div>
              ) : (
                <Link to={'/customer/login'}>Tài khoản</Link>
              )}
            </div>
          </div>
          <div className='hr-height'></div>
          <div css={cssCartMain} className='cart-main relative'>
            <Link to={'/cart'}>
              <AiOutlineShoppingCart className='font-extrabold' />
            </Link>
            {carts && accessToken ? (
              carts?.length >= 0 ? (
                <span className='absolute show-count'>{carts?.length}</span>
              ) : (
                ''
              )
            ) : cartNoLogin?.length >= 0 ? (
              <span className='absolute show-count'>{cartNoLogin?.length}</span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className='mt-[100px]'>
        {content.length > 0 && content.some((item: any) => item.hidden === 'Hiển thị') && (
          <Marquee
            css={cssMarquee}
            direction='left'
            className='sm:py-3 z-0 sticky'
            style={{
              borderTop: '1px solid black',
              borderBottom: '1px solid black',
              width: '95%',
              margin: 'auto',
              marginBottom: '5px',
              animationPlayState: 'paused'
            }}
          >
            {content.map((item: any) => {
              if (item.hidden === 'Hiển thị') {
                return (
                  <p
                    style={{ padding: '0px 300px' }}
                    key={item._id}
                    className='max-sm:text-[14px] max-sm:mt-[2px] text-[20px] text-black italic flex'
                  >
                    {/* <img className='w-auto max-sm:h-[24px] h-[30px] px-3' src="https://pubcdn.ivymoda.com/ivy2/images/logo.png" alt="Logo" /> */}
                    {item.content}
                  </p>
                )
              }
              return null
            })}
          </Marquee>
        )}
      </div>
    </div>
  )
}

export default HeaderComponent
const cssMenuDrawer = css`
  div {
    padding: 10px;
    font-size: 16px;
  }
  div:hover {
    background-color: #f5f5f5;
  }
  div a:hover {
    color: red;
  }
  .mobile-menu .ant-menu-item {
    padding-left: 40px !important;
  }
  .mobile-menu .ant-menu-sub {
    background-color: transparent !important;
  }
`
const cssMenu = css`
  @media not all and (min-width: 640px) {
    display: none;
  }
  display: flex;
  color: #221f20;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  .news-product {
    list-style: none;
    background-color: white;
    position: absolute;
    top: 17px;
    width: 216px;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #e7e8e9;
    border-right: 1px solid #e7e8e9;
    padding: 5px;
    border-radius: 4px;
    z-index: 1;
    visibility: hidden;
    border-radius: 8px;
  }
  .news-product a {
    margin: 4px;
  }
  .news-product a:hover {
    background-color: rgba(39, 39, 42, 0.12);
    border-radius: 8px;
  }
  .title:hover .news-product {
    visibility: visible;
  }
  .title {
    cursor: pointer;
    position: relative;
  }
`
const cssWrapperMenu = css`
  .links {
    font-size: 16px;
    list-style: none;
    background-color: white;
    position: absolute;
    border-left: 1px solid #e7e8e9;
    border-right: 1px solid #e7e8e9;
    border-bottom: 1px solid #e7e8e9;
    top: 30px;
    right: -16px;
    width: 162px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    border-radius: 4px;
    z-index: 1;
    visibility: hidden;
  }
  .links svg {
    display: inline-block;
    margin-right: 8px;
  }
  .links p:hover {
    background-color: rgba(39, 39, 42, 0.12);
    border-radius: 8px;
  }
  .item-menu:hover .links,
  .links:hover {
    visibility: visible;
  }
  .item-menu {
    display: none;
  }
  @media screen and (min-width: 640px) {
    .item-menu {
      display: flex;
      padding: 8px 16px;
      align-items: center;
      border-radius: 8px;
      cursor: pointer;
      justify-content: flex-end;
      border: 1px solid rgba(39, 39, 42, 0.12);
      margin: 0 4px;
      .icon {
        margin-right: 4px;
        font-size: 22px;
      }
    }

    .title {
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      position: relative;
    }
  }
  .item-menu:hover {
    background-color: rgba(39, 39, 42, 0.12);
    border: 1px solid rgba(39, 39, 42, 0.11);
  }
  .hr-height {
    width: 1px;
    border: 1px solid rgba(39, 39, 42, 0.12);
    margin: 0 4px;
  }
`
const cssCartMain = css`
  .show-count {
    top: -4px;
    right: -4px;
    border-radius: 50px;
    background: #ef4444;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 12px;
    height: 12px;
  }
  @media screen and (min-width: 640px) {
    .show-count {
      top: 0px;
      right: 0px;
      font-size: 1.3rem;
      width: 20px;
      height: 20px;
    }
  }

  position: relative;
  display: block;
  height: 100%;
  padding: 8px 14px;
  font-size: 22px;
  border-radius: 8px;
  color: var(--color-black);
  cursor: pointer;

  @media (min-width: 0) and (max-width: 739px) {
    padding: 0;
    margin-left: 10px;
  }
`
const cssDarkScreen = css`
  z-index: 10;
  opacity: 0.5;
  position: fixed;
  width: 100%;
  top: 95px;
  bottom: 0;
  left: 0;
  right: 0;
`
const cssMarquee = css`
  .rfm-marquee:hover {
    animation-play-state: paused;
  }
`
