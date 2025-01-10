import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderComponent from './../../component/stack/header/header.component'
import FooterComponent from '~/app/component/stack/footer/footer.component'
interface DefaultHomeProps {
  prop?: unknown
}

const DefaultHome: FunctionComponent<DefaultHomeProps> = () => {
  return (
    <div>
      <div className='bg-white'>
        <HeaderComponent />
      </div>
      <Outlet />
      <FooterComponent />
    </div>
  )
}

export default DefaultHome
