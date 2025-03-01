import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/products/ProductDetails";
import ProductList from "./components/products/ProductList";
import Checkout from "./components/checkout/Checkout";
import TrackOrder from "./components/orders/TrackOrder";
import AccountDashboard from "./components/account/AccountDashboard";
import Wishlist from "./components/wishlist/Wishlist";
import AboutUs from "./components/about/AboutUs";
import ContactUs from "./components/contact/ContactUs";
import AdminDashboard from "./components/admin/AdminDashboard";
import OrderDetails from "./components/admin/OrderDetails";
import CustomerDetails from "./components/admin/CustomerDetails";
import ProductForm from "./components/admin/ProductForm";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:categoryId" element={<ProductList />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/account" element={<AccountDashboard />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/orders" element={<AdminDashboard />} />
              <Route
                path="/admin/orders/:id"
                element={<OrderDetails orderId="" onBack={() => {}} />}
              />
              <Route path="/admin/products" element={<AdminDashboard />} />
              <Route
                path="/admin/products/new"
                element={
                  <ProductForm onSubmit={() => {}} onCancel={() => {}} />
                }
              />
              <Route
                path="/admin/products/:id"
                element={
                  <ProductForm onSubmit={() => {}} onCancel={() => {}} />
                }
              />
              <Route path="/admin/customers" element={<AdminDashboard />} />
              <Route
                path="/admin/customers/:id"
                element={<CustomerDetails userId="" onBack={() => {}} />}
              />
              <Route path="/admin/settings" element={<AdminDashboard />} />

              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
