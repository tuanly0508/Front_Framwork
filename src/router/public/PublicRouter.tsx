import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { CartContextProvider } from '../../contexts/CartContext';
import { ShopContextProvider } from '../../contexts/ShopContext';
import { UserContextProvider } from '../../contexts/UserContext';
import { WishListContextProvider } from '../../contexts/WishListContext';

export default function PublicRouter() {
  return (
    <>
      <UserContextProvider>
            <WishListContextProvider>
        <CartContextProvider>
          <ShopContextProvider>
              <Header />
              <Outlet />
              <Footer />
          </ShopContextProvider>
        </CartContextProvider>
            </WishListContextProvider>
      </UserContextProvider>
    </>
  )
}