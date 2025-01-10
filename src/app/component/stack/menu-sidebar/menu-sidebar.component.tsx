import { css } from '@emotion/react'
import { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOneUserSystem } from '~/app/api/auth/auth.api'
import { UserOutlined, GoldOutlined, PhoneOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd';
interface MenuSideBarProps {
  props?: any
}
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const MenuSideBar: FunctionComponent<MenuSideBarProps> = () => {
  const [user, setUser] = useState<any>()
  const id = localStorage.getItem('userID')
  useEffect(() => {
    getOneUserSystem(id).then((res: any) => {
      setUser(res.data)
    })
  }, [id])
  const items: MenuItem[] = [
    getItem(<p className='font-semibold text-[15px] px-4'>{user?.fullname}</p>, 'sub1', <div className='border'>
      <img
        src='https://banner2.cleanpng.com/20180517/uzq/kisspng-computer-icons-user-profile-male-avatar-5afd8d7b2682b3.7338522715265662671577.jpg'
        alt=''
        className='w-[50px]'
      />
    </div>, [
      getItem(<Link to="/manage-info">Thông tin tài khoản</Link>, '1', <UserOutlined />),
      getItem(<Link to="/manage">Quản lý đơn hàng</Link>, '2', <GoldOutlined />),
      getItem(<Link to="/support">Hỗ trợ</Link>, '3', <PhoneOutlined />),
    ]),

  ];
  const [openKeys, setOpenKeys] = useState(['']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div css={cssMenuSideBar}>
      <div className='hidden lg:block w-[200px]'>
        <div className='flex items-center pb-6'>
          <div>
            <img
              src='https://banner2.cleanpng.com/20180517/uzq/kisspng-computer-icons-user-profile-male-avatar-5afd8d7b2682b3.7338522715265662671577.jpg'
              alt=''
              className='w-[50px]'
            />
          </div>
          <div>
            <p className='font-semibold text-[15px] px-4'>{user?.fullname}</p>
          </div>
        </div>

        <div className='user-info'>
          <ul>
            <li>
              <Link to={'/manage-info'}>
                <a href='#'>
                  <UserOutlined /> <p>Thông tin tài khoản</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to={'/manage'}>
                <a href='#'>
                  {' '}
                  <GoldOutlined />
                  <p> Quản lý đơn hàng</p>
                </a>
              </Link>
            </li>
            <li>
              <Link to={'/support'}>
                <a href='#'>
                  {' '}
                  <PhoneOutlined />
                  <p>Hỗ trợ</p>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='block lg:hidden'>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: "auto", margin: 5, border: 0 }}
          items={items}
          defaultOpenKeys={[]}
        />
      </div>
    </div>
  )
}

export default MenuSideBar

const cssMenuSideBar = css`
margin-bottom:10px;
  li {
    padding: 10px 0px;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #808285;
  }
  span {
    font-size: 20px;
    margin-right: 4px;
  }
  .user-info a {
    display: flex;
    gap: 4px;
  }
  .user-info p {
    line-height: 22px;
  }
  .btn{
    
  }
`
