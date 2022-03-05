import './Header.css'
import { FaSearch, FaShoppingCart, FaUser, FaAngleDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { AuthAxios } from '../../controllers/AuthAxios'
import { CartContext } from '../../contexts/CartContext'
import { BsHeartFill } from 'react-icons/bs'
import { WishListContext } from '../../contexts/WishListContext'

export default function Header() {
    const cartContext = useContext(CartContext)
    const userContext = useContext(UserContext)
    const wishListContext = useContext(WishListContext)

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        AuthAxios.defaults.headers.common['authorization'] = ""
    }
    
    return (
        <section>
            <div className="container-header">
                <div className="content-header">
                    <div className="header-top">
                        <div className='header-top-left'>
                            <p>Welcome back <span> {userContext.user.id_user !== '' ? userContext.user.name_user : null} !!!</span> </p>

                        </div>
                        <div className='header-top-right'>
                            <i><FaSearch /></i>
                            <Link to='/wishlist'>
                                <i className='icon-cart'><BsHeartFill /> <p className='quantity-cart'>{wishListContext.quantity}</p>
                                </i>
                            </Link>
                            <Link to='/cart'>
                                <i className='icon-cart'><FaShoppingCart /> <p className='quantity-cart'>{cartContext.quantity}</p>
                                </i>
                            </Link>
                            <ul className='menu-parent'>
                                <li><i><FaUser /> <FaAngleDown /> </i>
                                    <ul className='menu-child'>
                                        <Link to='/login'><li onClick={handleLogout}>LOGOUT</li></Link>
                                        <Link to='/orders'><li>ORDER</li></Link>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="header-bot">
                        <div className='menu-left'>
                            <ul className='menu'>
                                <li><Link to='/'><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/icon-menu.png?1627669611465" alt="" />HOME</Link></li>
                                <li className='menu-parent' ><Link to='/shop'><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/icon-menu.png?1627669611465" alt="" /> SHOP <i><FaAngleDown /></i>
                                    <ul className='menu-child'>
                                        <li>Dog's food</li>
                                        <li>Cat food</li>
                                        <li>Hamster food</li>
                                        <li>Bird food</li>
                                        <li>Dog accessories</li>
                                        <li>Cat accessories</li>
                                    </ul>
                                </Link></li>
                                <li><Link to='/price'><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/icon-menu.png?1627669611465" alt="" /> PRICE LIST</Link></li>
                            </ul>
                        </div>
                        <div className='menu-mid'>
                            <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/logo.png?1639287465667" alt="logo" />
                        </div>
                        <div className='menu-right'>
                            <ul className='menu'>
                                <li><Link to=''><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/icon-menu.png?1627669611465" alt="" />NEWS</Link></li>
                                <li><Link to=''><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/icon-menu.png?1627669611465" alt="" />BOOKING</Link></li>
                                <li><Link to=''><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/icon-menu.png?1627669611465" alt="" />CONTACT</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
