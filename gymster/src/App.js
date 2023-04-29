import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import List from "./pages/list/List"
import MyAccount from "./pages/profile-pages/MyAccount";
import MyOrders from "./pages/profile-pages/my-orders/MyOrders";
import MyOrdersDelivered from "./pages/profile-pages/my-orders/MyOrdersDelivered";
import MyOrdersShipped from "./pages/profile-pages/my-orders/MyOrdersShipped";
import MyOrdersCancelled from "./pages/profile-pages/my-orders/MyOrdersCancelled";
import ChangePassword from "./pages/profile-pages/ChangePassword";
import ShippingAddress from "./pages/profile-pages/ShippingAddress";
import ShippingAddressAdd from "./pages/profile-pages/ShippingAddressAdd";
import Footer from "./components/footer/Footer";
import Store from "./pages/store/Store";
import Register from "./pages/register/Register";
import AboutUs from "./pages/about-us/AboutUs";
import ProductDetail from "./pages/product-detail/ProductDetail";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import MemberJoinForm from "./pages/member-join-form/Member-join-form";
import ShippingAddressEdit from "./pages/profile-pages/ShippingAddressEdit";
import Checkout from "./pages/checkout-page/CheckoutProduct";
import CheckoutProduct from "./pages/checkout-page/CheckoutProduct";
import CheckoutMembership from "./pages/checkout-page/CheckoutMembership";
import { ToastContainer } from "react-toastify";
import MyOrdersPending from "./pages/profile-pages/my-orders/MyOrdersPending";

function App() {
  return (
    <>
    <ToastContainer/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:products" element={<List />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-orders-pending" element={<MyOrdersPending />} />
        <Route path="/my-orders-delivered" element={<MyOrdersDelivered />} />
        <Route path="/my-orders-shipped" element={<MyOrdersShipped />} />
        <Route path="/my-orders-cancelled" element={<MyOrdersCancelled />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/shipping-address" element={<ShippingAddress />} >
          <Route path="edit-shipping-address/:id" element={<ShippingAddressEdit />} />
        </Route>
        <Route path="/add-shipping-address" element={<ShippingAddressAdd />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/join-form/:id" element={<MemberJoinForm />} />
        <Route path="/join-form" element={<MemberJoinForm />} />
        <Route path="/checkout-product" element={<CheckoutProduct />} />
        <Route path="/checkout-membership/:id" element={<CheckoutMembership />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
