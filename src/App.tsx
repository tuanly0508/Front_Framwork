import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './contexts/UserContext'
import PageAdmin from './page/admin/PageAdmin'
import CartPage from './page/cart/CartPage'
import Checkout from './page/checkout/Checkout'
import HomePage from './page/home/HomePage'
import Login from './page/login/Login'
import PageOrder from './page/order/PageOrder'
import ProductDetail from './page/product-detail/ProductDetail'
import PageShop from './page/shop/PageShop'
import WishList from './page/wishlist/WishList'
import PrivateRouter from './router/private/PrivateRouter'
import PublicRouter from './router/public/PublicRouter'

export default function App() {
  return (
    <BrowserRouter>
      
      <UserContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<PrivateRouter />} >
            <Route path="product" element={<PageAdmin />} />
          </Route>

          <Route path="/" element={<PublicRouter />} >
            <Route index={true} element={<HomePage />} />
            <Route path="shop" element={<PageShop />} />
            <Route path="detail" element={<ProductDetail />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<PageOrder />} />
            <Route path="wishlist" element={<WishList />} />
          </Route>

        </Routes>
        </UserContextProvider>
      
    </BrowserRouter>
  )
}