import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import ServiceList from "./Pages/ServiceList/ServiceList";
import ServiceOptions from "./Pages/ServiceOptions/ServiceOptions";
import CustomerDashboard from "./Pages/CustomerDashboard/CustomerDashboard";
import Cart from "./Pages/cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProfilePage from "./Pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/servicesOption/:id/:serviceType" element={<ServiceOptions />} />
      <Route path="/customerdb" element={<CustomerDashboard />} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/profile" element={<ProfilePage/>} />
    </Routes>
  );
}

export default App;
