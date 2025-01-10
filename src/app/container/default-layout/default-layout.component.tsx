import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
interface DefaultLayoutProps {
    prop?: unknown
}

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default DefaultLayout