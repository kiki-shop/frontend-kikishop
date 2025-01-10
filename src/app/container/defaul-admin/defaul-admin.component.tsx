import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { css } from '@emotion/react'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { menuDashBoard } from '~/app/modules/admin/constance/menu-dashboard'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { BiBell } from 'react-icons/bi'
import { getAllSupport } from '~/app/modules/admin/support-admin/service/support-admin.service'
import { getAllOrder } from '~/app/modules/admin/order/service/order.service'
import { getOneUserSystem } from '~/app/api/auth/auth.api'

const { Header, Sider, Content } = Layout

const DefaultAdmin: React.FC = () => {
  const [supports, setSupports] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getAllSupport().then((res: any) => {
      setSupports(res.data)
    })
    getAllOrder().then((res: any) => {
      const newOrder = res.data.filter((item: any) => item.orderStatus === 'đang chờ duyệt')
      setOrders(newOrder)
    })
  }, [])

  let navigate = useNavigate()
  const [user, setUser] = useState<any>()
  const id = localStorage.getItem('userID')
  useEffect(() => {
    getOneUserSystem(id).then((res: any) => {
      setUser(res.data)
    })
  }, [id])
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const handleClickMenuDashboard = (data: any) => {
    if (data.key == 'https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm') {
      window.open('https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm')
    } else {
      navigate(data.key)
    }
  }
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {}, [accessToken])

  return (
    <Layout css={cssLayout} style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div css={cssLogoAdmin}>
          <img
            className='w-[300px] h-[70px]'
            src='https://res.cloudinary.com/dfj3obru8/image/upload/v1702389365/pwrxo90fsvgcfwxregrs.png'
            alt=''
          />
        </div>
        <hr />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={menuDashBoard}
          onSelect={handleClickMenuDashboard}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,

            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
          <div className='author flex mr-[24px] gap-[24px]'>
            <div css={cssCartMain} className='cart-main relative mt-5'>
              <Link to={'/admin/support'}>
                <HiOutlineMailOpen className='font-bold' />
              </Link>
              {supports?.length >= 0 && accessToken ? (
                <span className='absolute show-count'>{supports?.length}</span>
              ) : (
                ''
              )}
            </div>

            <div css={cssCartMain} className='cart-main relative mt-5'>
              <Link to={'/admin/order'}>
                <BiBell className='font-bold' />
              </Link>
              {orders?.length >= 0 && accessToken ? <span className='absolute show-count'>{orders?.length}</span> : ''}
            </div>

            <div className='flex gap-[4px]'>
              <img
                className='author-img h-[36px] m-auto object-cover'
                width={'36px'}
                src='https://cdn1.iconfinder.com/data/icons/flags-36/512/Vietnam_Country_flag-512.png'
              />
              <p className=''>Việt Nam</p>
            </div>
            <div className='border-[1px] h-[40px] m-auto'></div>
            <img
              className='author-img h-[36px] m-auto rounded-[50%] object-cover'
              width={'36px'}
              src='https://banner2.cleanpng.com/20180517/uzq/kisspng-computer-icons-user-profile-male-avatar-5afd8d7b2682b3.7338522715265662671577.jpg'
            />
            <p className='pr-8'>{user?.fullname}</p>
          </div>
        </Header>

        <Content
          style={{
            margin: '0 16px',
            marginBottom: '24px',
            padding: 24,
            minHeight: 280,
            overflowY: 'auto',
            background: colorBgContainer
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultAdmin

const cssLogoAdmin = css`
  color: white;
  margin: 10px;
  padding: 10px 10px;
  text-align: center;
  background-color: white;
  .ant-menu-item-selected {
    background-color: #fff;
  }
`
const cssLayout = css`
  .ant-menu {
    margin-top: 20px;
  }
  .ant-menu-item-selected,
  .ant-menu-item-active,
  .ant-menu-item-selected:active {
    background-color: #ffaa00 !important;
    font-size: 16px;
  }
  .ant-menu-item-icon {
    font-size: 16px !important;
    margin-right: 8px;
  }
`
const cssCartMain = css`
  .show-count {
    top: 0px;
    right: 0px;
    border-radius: 50px;
    background: #ef4444;
    font-size: 1.3rem;
    color: white;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
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
