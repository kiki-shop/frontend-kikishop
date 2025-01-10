import {
  FileOutlined,
  UserOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  MoneyCollectOutlined,
  BankOutlined,
  HomeOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  FileAddOutlined
} from '@ant-design/icons'
import { SiAdminer } from 'react-icons/si'

export const menuDashBoard = [
  {
    key: '/admin',
    icon: <SiAdminer />,
    label: 'Bảng điều kiển'
  },
  {
    key: '/admin/user',
    icon: <UserOutlined />,
    label: 'Người dùng'
  },
  {
    key: '/admin/category',
    icon: <FileOutlined />,
    label: 'Danh mục'
  },
  {
    key: '/admin/product',
    icon: <OrderedListOutlined />,
    label: 'Sản phẩm'
  },
  {
    key: '/admin/comment',
    icon: <CommentOutlined />,
    label: 'Bình luận - Đánh giá'
  },
  {
    key: '/admin/order',
    icon: <ShoppingCartOutlined />,
    label: 'Đơn hàng'
  },
  {
    key: '/admin/support',
    icon: <CustomerServiceOutlined />,
    label: 'Liên hệ'
  },
  {
    key: '/admin/vorcher',
    icon: <MoneyCollectOutlined />,
    label: 'Mã giảm giá'
  },
  {
    key: '/admin/content',
    icon: <FileAddOutlined />,
    label: 'Nội dung'
  },
  {
    key: '/admin/statistics',
    icon: <BarChartOutlined />,
    label: 'Thông kê'
  },
  {
    key: 'https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm',
    icon: <BankOutlined />,
    label: 'Thanh toán VNPay'
  },
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Trang chủ'
  }
]
