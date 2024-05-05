import Navleft from "./component/navleft";
import Header from "./component/header";
import Control from "./component/control";
import Kanban from "./component/Kanban";
import "./CSS/app.css"
import Seconddir from "./component/seconddir";
import router from './Router';
import {RouterProvider} from 'react-router-dom'
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
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
