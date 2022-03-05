
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { cartController } from '../../controllers/CartController';
import { Cart } from '../../model/Cart';
import CartEmpty from './CartEmpty';
import './css/CartPage.css'
import ItemCart from './ItemCart';

export default function CartPage() {
    const userContext = useContext(UserContext)
    const cartContext = useContext(CartContext)

    const handleRemoveCart = (cart:Cart) => {
        cartController.delete(cart).then(res => {
            cartContext.changeDataCart(res.dataCart,res.totalPrice)
        })
    }

    const handleUpdateCart = (cart:Cart) => {
        cartController.update(cart).then(res => {
            cartContext.changeDataCart(res.dataCart,res.totalPrice)
        })
        userContext.popupAdd('Update quantity success !!!')
    }

    return (
        <section>
            <div style={{overflow:'auto'}}>
                <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/breadcrumb.png?1627705031688" alt="" />
            </div>
            <div className='container-cart'>
                <div className='content-cart'>
                    {cartContext.totalPrice===0 ? <CartEmpty/> :
                        <React.Fragment>
                            <div className='cart-top'>
                                <h2>YOUR CART</h2>
                                <Link to='/shop'><button>SHOP</button></Link>
                            </div>
                            <div className='cart-mid'>
                                <ItemCart dataCart={cartContext.dataCart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} />
                            </div>
                            <div className='cart-bot'>
                                <p>Total payment: <span>{cartContext.totalPrice} $</span></p>
                                <Link to='/checkout' ><button>Check out</button></Link>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </section>
    )
}
