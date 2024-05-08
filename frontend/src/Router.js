import {createBrowserRouter} from 'react-router-dom'
import Kanbanpage from './Page/Kanbanpage';
import Projectpage from './Page/Projectpage';
import Weekpage from './Page/Weekpage';
<<<<<<< HEAD
import Daypage from './Page/Daypage';
=======
>>>>>>> 1813fc609af227b7b37ed41548dadee124846eb0
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
<<<<<<< HEAD
    },
         {
             path:'/day',
             element:<Daypage></Daypage>
         }
=======
    }
>>>>>>> 1813fc609af227b7b37ed41548dadee124846eb0
])
export default router;