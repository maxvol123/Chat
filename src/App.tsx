import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Approuter from "./components/Approuter";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Approuter/>
    </BrowserRouter>
  );
}

export default App;