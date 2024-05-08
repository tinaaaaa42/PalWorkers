import Navleft from "./component/navleft";
import Header from "./component/header";
import Control from "./component/control";
import Kanban from "./component/Kanban";
import "./CSS/app.css"
import Seconddir from "./component/seconddir";
import router from './Router';
import {RouterProvider} from 'react-router-dom'
<<<<<<< HEAD
import { ModalProvider } from './context/ModalContext';
=======
>>>>>>> 1813fc609af227b7b37ed41548dadee124846eb0
function App() {
  return (
    <div className="App">
      {/* <div className="container">
        <Navleft></Navleft>
        <Seconddir></Seconddir>
        <div className="mainpart">
        <Header></Header>
        <Control></Control>
        <Kanban></Kanban>
        </div>
      </div> */}
<<<<<<< HEAD
      <ModalProvider>
      <RouterProvider router={router}></RouterProvider>
      </ModalProvider>
=======
      <RouterProvider router={router}></RouterProvider>
>>>>>>> 1813fc609af227b7b37ed41548dadee124846eb0
    </div>
  );
}

export default App;
