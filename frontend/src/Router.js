import {createBrowserRouter} from 'react-router-dom'
import Kanbanpage from './Page/Kanbanpage';
import Projectpage from './Page/Projectpage';
import Weekpage from './Page/Weekpage';
import Daypage from './Page/Daypage';
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
         }
])
export default router;