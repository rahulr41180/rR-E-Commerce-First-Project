
import './App.css';

import "./css/Global.css";
import { Header }  from "./components/Layout/Header";
import { Layout } from "./components/Layout/Layout";
import { Footer } from "./components/Layout/Footer";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage"
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PolicyPage } from "./pages/PolicyPage";

import { PageNotFoundPage } from "./pages/PageNotFoundPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { SearchPage } from './pages/SearchPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductBasedOnCategoryPage } from './pages/ProductsBasedOnCategoryPage';
import { CartPage } from './pages/CartPage';
import { Checkout } from './pages/Checkout';
import { UserDashboard } from './pages/user/UserDashboard';

import { UserOrders } from './pages/user/UserOrders';
import { UserProfile } from './pages/user/UserProfile';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminCreateCategory } from './pages/Admin/AdminCreateCategory';
import { AdminCreateProduct } from './pages/Admin/AdminCreateProduct';
import { AdminUser } from './pages/Admin/AdminUser';
import { AdminProduct } from './pages/Admin/AdminProducts';
import { AdminUpdateProduct } from './pages/Admin/AdminUpdateProduct';
import { AdminOrders } from './pages/Admin/AdminOrders';

import { PrivateRoute } from './components/Routes/PrivateRoute';
import { AdminPrivateRoute } from './components/Routes/AdminPrivateRoute';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { ForgotSecretKey } from './pages/Auth/ForgotSecretKey';

function App() {
  return (
    <Routes>

      {/* If there is nested route than we need to use opening and closing brackets for route
      Like : <Route></Route>

      But if there is no nested route than we can use route tag with self closing brackets 
      Like : <Route /> either we can use it with opening and closing brackets.
      */}

      <Route path="/" element={<><HomePage /></>} />
      <Route path="/about" element={<><AboutPage /></>} />
      <Route path="/contact" element={<><ContactPage /></>} />
      <Route path="/policy" element={<><PolicyPage /></>} />
      <Route path="/register" element={<><RegisterPage /></>} />

      <Route path="/login" element={<><LoginPage /></>} />
      <Route path="/search" element={<><SearchPage /></>} />
      <Route path="/product-details/:pId" element={<><ProductDetailsPage /></>} />
      <Route path="/category-based-product/:categoryName/:cId" element={<><ProductBasedOnCategoryPage /></>} />
      <Route path="/cart" element={<><CartPage /></>} />
      <Route path="/checkout/:tqtp" element={<><Checkout /></>} />
      <Route path="/forgot-password" element={<><ForgotPassword /></>} />
      <Route path="/forgot-secret-key" element={<><ForgotSecretKey /></>} />
      <Route path="/dashboard" element={<><PrivateRoute /></>}>

        <Route path="user" element={<><UserDashboard /></>} />
        <Route path="user/orders" element={<><UserOrders /></>} />
        
        <Route path="user/profile" element={<><UserProfile /></>} />
      </Route>
      <Route path="/dashboard" element={<><AdminPrivateRoute /></>}>
        <Route path="admin" element={<><AdminDashboard /></>} />

        <Route path="admin/create-category" element={<><AdminCreateCategory /></>} />
        <Route path="admin/create-product" element={<><AdminCreateProduct /></>} />
        <Route path="admin/users" element={<><AdminUser /></>} />
        <Route path="admin/products" element={<><AdminProduct /></>} />
        <Route path="admin/product-details/:pId" element={<><AdminUpdateProduct /></>} />
        <Route path="admin/all-orders" element={<><AdminOrders /></>} />
      </Route>
      {/* path="*" : * means is if there is any route which will not match with any route than 
      route show "*"(Default) route content means Page Not Found Page */}
      <Route path="*" element={<><PageNotFoundPage /></>} />

    </Routes>
  );
}
export default App;