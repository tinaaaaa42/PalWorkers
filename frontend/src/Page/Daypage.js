import Navleft from "../component/navleft";
import Header from "../component/header";
import Control from "../component/control";
import Daytodo from "../component/daytodocard";
import Dayphoto from "../component/dayphotocard";
import "../CSS/app.css"
import Seconddir from "../component/seconddir";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navleft></Navleft>
        <Seconddir></Seconddir>
        <div className="mainpart">
        <Header></Header>

        <div class="two-columns">
        <div><Daytodo></Daytodo></div>
          <div> <Dayphoto></Dayphoto> </div>
           </div>
        </div>

      </div>

    </div>
  );
}

export default App;