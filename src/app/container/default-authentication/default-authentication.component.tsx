import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import FooterComponent from '~/app/component/stack/footer/footer.component'
import HeaderComponent from '~/app/component/stack/header/header.component'
interface DefaultAuthenticationProps {
    prop?: unknown
}

const DefaultAuthentication: FunctionComponent<DefaultAuthenticationProps> = () => {
    return (
        <div>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
        </div>
    )
}

export default DefaultAuthentication