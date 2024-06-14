import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
const Layout = () => {
    return (
        <>
            <div className='overflow-hidden'>
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}
export default Layout