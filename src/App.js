
import './App.css';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
import MyOrder from './screens/myOrder';
import AboutUs from './screens/Aboutus';
import Contact from './screens/Contact';
import Page404 from './screens/Page404';

function App() {
  return (
    <div className="App">


      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/myOrder" element={<MyOrder />} />
              <Route path="/Aboutus" element={<AboutUs />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="*" element={<Page404 />} />

            </Route>


          </Routes>
        </BrowserRouter>
      </CartProvider>

    </div>
  );
}

export default App;
