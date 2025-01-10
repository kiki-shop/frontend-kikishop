import { css } from '@emotion/react'
import React, { Children, FunctionComponent, useState } from 'react'
import { FaFacebookF, FaYoutube, FaTelegram } from 'react-icons/fa';
import ButtonSqua from '../../parts/button/ButtonSqua';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

interface FooterComponentProps {
  props?: any
}

const FooterComponent: FunctionComponent<FooterComponentProps> = () => {

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Giới thiệu', 'sub1', [
    getItem('Về KiKi', '1'),
    getItem('Tuyển dụng', '2'),
    getItem('Hệ thống cửa hàng', '3'),
  ]),
  getItem('Dịch vụ khách hàng', 'sub2', [
    getItem('Chính sách điều khoản', '5'),
    getItem('Hướng dẫn mua hàng', '6'),
    getItem('Chính sách thanh toán', '7'),
    getItem('Chính sách đổi trả', '8'),
    getItem('Chính sách bảo hành', '9'),
    getItem('Chính sách giao nhận vận chuyển', '10'),
    getItem('Chính sách thẻ thành viên', '11'),
    getItem('Hệ thống cửa hàng', '12'),
    getItem('Q&A', '13'),
  ]),
  getItem('Liên hệ', 'sub4', [
    getItem('Hotline', '14'),
    getItem('Email', '15'),
    getItem('Live chat', '16'),
    getItem('Messenger', '17'),
    getItem('Liên hệ', '18'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
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
    <footer css={cssFooter}>
      <div className='main-footer px-2 md:px-0 block md:flex justify-around sm:py-40 py-10'>
        <div className='column-one'>
          <div className='logo flex justify-between gap-9 pb-6'>
            <div>
              <img className='' src="https://res.cloudinary.com/dfj3obru8/image/upload/v1702389365/pwrxo90fsvgcfwxregrs.png" alt="" />
            </div>
            <div>
              <img className='max-sm:max-w-[80%]' src="https://images.dmca.com/Badges/dmca_protected_16_120.png?ID=0cfdeac4-6e7f-4fca-941f-57a0a0962777" alt="" />
            </div>
            <div>
              <img className='max-sm:max-w-[90%]' src="https://pubcdn.ivymoda.com/ivy2/images/img-congthuong.png" alt="" />
            </div>
          </div>

          <div className='text-content'>
            <p>Công ty Cổ phần Dự Kim với số đăng ký kinh doanh: 0105777650</p>
            <div className='py-3'>
              <p><b>Địa chỉ đăng ký:</b>Tổ dân phố Tháp, P.Đại Mỗ, Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam</p>
            </div>
            <div className=''>
              <p><b>Số điện thoại: </b> 0243 205 2222/ 090 589 8683</p>
            </div>
            <div className='py-3'>
              <p><b>Email: </b> kiki@gmail.com</p>
            </div>
          </div>

          <div className='social flex gap-14 sm:py-9 py-4'>
            <img className='w-[12px]' src="https://pubcdn.ivymoda.com/ivy2/images/ic_fb.svg" alt="" />
            <img className='w-[22px]' src="https://pubcdn.ivymoda.com/ivy2/images/ic_gg.svg" alt="" />
            <img className='w-[29px]' src="https://pubcdn.ivymoda.com/ivy2/images/ic_instagram.svg" alt="" />
            <img className='w-[26px]' src="https://pubcdn.ivymoda.com/ivy2/images/ic_pinterest.svg" alt="" />
            <img className='w-[24px]' src="https://pubcdn.ivymoda.com/ivy2/images/ic_ytb.svg" alt="" />
          </div>

          <div className='hotline  py-4'>
            <a href='' className='px-[10px] py-[12px] md:px-[5px] lg:px-[24px]'>Hotline: 0246 662 3434</a>
          </div>
        </div>
        <div className='column-two max-sm:hidden'>
          <h2 className='text-title'>Giới thiệu</h2>
          <div className='text-content' >
            <p>Về KiKi</p>
            <p>Tuyển dụng</p>
            <p>Hệ thống cửa hàng</p>
          </div>
        </div>
        <div className='column-three max-sm:hidden'>
          <h2 className='text-title'>Dịch vụ khách hàng</h2>
          <div className='text-content' >
            <p>Chính sách điều khoản</p>
            <p>Hướng dẫn mua hàng</p>
            <p>Chính sách thanh toán</p>
            <p>Chính sách đổi trả</p>
            <p>Chính sách bảo hành</p>
            <p>Chính sách giao nhận vận chuyển</p>
            <p>Chính sách thẻ thành viên</p>
            <p>Hệ thống cửa hàng</p>
            <p>Q&A</p>
          </div>
        </div>
        <div className='column-four max-sm:hidden'>
          <h2 className='text-title'>Liên hệ</h2>
          <div className='text-content' >
            <p>Hotline</p>
            <p>Email</p>
            <p>Live chat</p>
            <p>Messenger</p>
            <p>Liên hệ</p>
          </div>
        </div>
       <div className='sm:hidden'>
       <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: "100%" }}
      items={items}
    />
       </div>
        <div className='column-five'>
          <div className='form'>
            <h2 className='text-title'>Nhận thông tin các chương trình của KiKi</h2>
            <form className='flex justify-between'>
              <input className='email' type="text" name="email" placeholder="Nhập địa chỉ email" />
              <ButtonSqua className='btnSqua'>
                Đăng ký
              </ButtonSqua>
            </form>
          </div>

          <div className='down-app'>
            <p className='text-title'> Download App</p>
            <div className='max-sm:flex gap-[10px]'>
              <img className='sm:mb-4' src="https://pubcdn.ivymoda.com/ivy2/images/appstore.png" alt="" />
              <img src="https://pubcdn.ivymoda.com/ivy2/images/googleplay.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className='p-9'>
        <div className='text-site'>©KiKi All rights reserved</div>
      </div>
    </footer>
  )
}

export default FooterComponent

const cssFooter = css`
    padding: 60px 0 0;    
    .main-footer{
    border-bottom: 2px solid #D1D2D4;    
    border-top: 2px solid #D1D2D4;    
    }
  .column-one{
    max-width:22.05%
  }
  .column-two{
    max-width:11.9%
  }
  .column-three{
    max-width:21.75%
  }
  .column-four{
    max-width:11.9%
  }
  .column-five{
    max-width:23.75%
  }

  .text-title{
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #221F20;
    margin-bottom: 20px;
  }
  
  .text-content p{
    font-size: 14px;
    line-height: 24px;
    color: #57585A;
    margin-bottom: 16px;
    display: block;
  }
  .hotline a{
    background: #221F20;
    border-radius: 16px 0px;
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;
    color: #F7F8F9;
    font-family: 'Roboto', sans-serif
  }

  .form{
    border: 4px solid #E7E8E9;
    border-radius: 56px 0px;
    padding: 24px 12px;
  }

  .email{
    padding: 9px;    
    border-bottom: 2px solid #BCBDC0;
    max-width:52%;
    outline:none
  }

  .down-app{
    margin-top:24px;
  }
  .text-site{
    font-size: 16px;
    line-height: 20px;
    color: #57585A;
    text-align: center;
  }
  .btnSqua{
    padding:12px 27px;
    border-radius:24px 0;
  }
  
@media (min-width: 0) and (max-width: 739px) { 
  position: relative;
  height: 0;
  .column-one{
    max-width:100%;
    margin-bottom:10px;
  } 
  .column-two{
    max-width:100%;
    margin-bottom:10px;
  }
  .column-three{
    max-width:100%;
    margin-bottom:10px;
  }
  .column-four{
    max-width:100%;
    margin-bottom:10px;
  }
  .column-five{
    max-width:100%;
    margin-bottom:10px;
  }
  .text-content p{
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 0;
  }
  .text-title{
    font-size: 16px;
    line-height: 32px;
  }
  }
`