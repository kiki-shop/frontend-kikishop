import { useRoutes } from 'react-router-dom'
import DefaultLayout from './app/container/default-layout/default-layout.component'
import { clientRouter } from './app/modules/client/router'
import DefaultHome from './app/container/default-home/default-home.component'
import DefaultAuthentication from './app/container/default-authentication/default-authentication.component'
import ForgotPassword from './app/modules/client/accountLogin/forgotPassword.component'
import Login from './app/modules/client/accountLogin/login.component'
import Register from './app/modules/client/accountLogin/register.component'
import { adminRouter } from './app/modules/admin/router'
import DefaultAdmin from './app/container/defaul-admin/defaul-admin.component'
import { CheckAuth } from './app/container/check-auth/CheckAuth.component'
function App() {
  let element: any = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '',
          element: <DefaultHome />,
          children: clientRouter
        },
        {
          path: 'admin',
          element: (
            <CheckAuth>
              <DefaultAdmin />
            </CheckAuth>
          ),
          children: adminRouter
        },
        {
          path: 'customer',
          element: <DefaultAuthentication />,
          children: [
            {
              path: 'login',
              element: <Login />,
            },
            {
              path: 'register',
              element: <Register />,
            },
            {
              path: 'forgotpass',
              element: <ForgotPassword />,
            },
          ]
        }
      ]
    }
  ])

  return element
}

export default App
