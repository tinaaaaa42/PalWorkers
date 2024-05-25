import {createBrowserRouter} from 'react-router-dom'
import Kanbanpage from './Page/Kanbanpage';
import Projectpage from './Page/Projectpage';
import Weekpage from './Page/Weekpage';
import Daypage from './Page/Daypage';
import Profilepage from './Page/Profilepage';
import Loginpage from './Page/Loginpage';
import NavbarExample from './component/Navv';
import Navbar from './component/Navv';
const router=createBrowserRouter([
    {
        path:'/',
        element:<Kanbanpage></Kanbanpage>
    },
    {
        path:'/project/:projectid',
        element:<Projectpage></Projectpage>
    },
    {
        path:'/week',
        element:<Weekpage></Weekpage>
    },
    {
        path:'/day',
        element:<Daypage></Daypage>
    },{
        path:'/profile',
        element:<Profilepage></Profilepage>
    },{
        path:'/login',
        element:<Loginpage></Loginpage>
    },{
        path:'/test',
        element:<Navbar></Navbar>
    }
])
export default router;