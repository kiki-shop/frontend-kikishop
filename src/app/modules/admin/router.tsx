import { RouteObject } from 'react-router-dom'
import UserManagemnet from './user/user.component'
import OrderManagement from './order/order.component'
import ProductManagement from './product/product.component'
import CategoryManagement from './category/category.component'
import VocherManange from './vocher/vorcher.component'
import PaymentComponennt from './payment/payment.component'
import StatisticsCompoennt from './statistics/statistics.component';
import CommentAdminComponent from './comment-admin/comment-admin.component'
import SupportAdmin from './support-admin/support-admin.component'
import DashBoard from './dashBoard/dashBoard.component'
import ContentManagement from './content/content.component'
import { CheckAdmin } from '~/app/container/check-auth/CheckAdmin.component'


export const adminRouter: RouteObject[] = [
    {
        path: '',
        element: <DashBoard />,
        children: []
    },
    {
        path: 'user',
        element: (
            <CheckAdmin>
                <UserManagemnet/>
            </CheckAdmin>
        )
        ,
        children: []
    },
    {
        path: 'order',
        element: <OrderManagement />,
        children: []
    },
    {
        path: 'category',
        element: <CategoryManagement />,
        children: []
    },
    {
        path: "comment",
        element: <CommentAdminComponent />
    },

    {
        path: 'product',
        element: <ProductManagement />,
        children: []
    },
    {
        path: 'vorcher',
        element: <VocherManange />,
        children: []
    },
    {
        path: 'paymentvnpay',
        element: <PaymentComponennt />,
        children: []
    },
    {
        path: 'statistics',
        element: <StatisticsCompoennt />,
        children: []
    },
    {
        path: 'support',
        element: <SupportAdmin />,
        children: []
    },
    {
        path: 'content',
        element: <ContentManagement />,
        children: []
    }

]