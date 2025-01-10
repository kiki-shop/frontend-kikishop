import { RouteObject } from 'react-router-dom'
import Home from './home/home.component'
import Cart from './cart/cart.component'
import Detail from './detail/detail.component'
import ManageOrder from './manage-order/manage-order.component'
import Products from './products/products.component'
import CheckOut from './checkout/checkout.component'
import GeneralIntroduction from './aboutUs/generalIntroduction.component'
import FashionShow from './aboutUs/fashionShow.component'
import CommunityActivities from './aboutUs/communityActivities.component'
import ThankCustomers from './thank-Customers/thankCustomers.component'
import LifeStyle from './lifeStyle/lifeStyle.component'
import Contacts from './contact/contact.component'
import Support from './support/support.component'
import ManageInfoCustomer from './manager-info-customer/manage-info-customer.component'
import ErrorCustomer from './error-customer/error-customer.component'
import OrderProcess from './orderProcess/orderProcess.component'

export const clientRouter: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/detail/:id',
    element: <Detail />
  },
  {
    path: "/manage",
    element: <ManageOrder />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/payment',
    element: <CheckOut />
  },
  {
    path: '/general',
    element: <GeneralIntroduction />
  },
  {
    path: '/fashion-Show',
    element: <FashionShow />
  },
  {
    path: '/Community-Activities',
    element: <CommunityActivities />
  },
  {
    path: '/thankcustomers',
    element: <ThankCustomers />
  },
  {
    path: '/errorcustomers',
    element: <ErrorCustomer />
  },
  {
    path: '/LifeStyle',
    element: <LifeStyle />
  },
  {
    path: '/Contacts',
    element: <Contacts />
  },
  {
    path: '/support',
    element: <Support />
  },
  {
    path: '/manage-info',
    element: <ManageInfoCustomer />
  },
  {
    path: '/order-process',
    element: <OrderProcess />
  }
]
