import './Product.css'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemShop from '../../shop/ItemShop';
import { useContext, useEffect } from 'react';
import { WishList } from '../../../model/WishList';
import { ShopContext } from '../../../contexts/ShopContext';
import { wishListController } from '../../../controllers/WishListController';
import { WishListContext } from '../../../contexts/WishListContext';
import { UserContext } from '../../../contexts/UserContext';

export default function BestSeller() {
    const wishListContext = useContext(WishListContext)
    const shopContext = useContext(ShopContext)
    const userContext = useContext(UserContext)

    useEffect(() => {
        shopContext.changeSort('sellCount','desc','')
    },[])

    const wishList = (wishList:WishList) => {
        if(wishList.likes === false) {
            wishListController.delete(wishList).then(res => {wishListContext.changeWishList(res)})
            userContext.popupAdd('Delete wishlist success!!!')
        }else{
            wishListController.create(wishList).then(res => {wishListContext.changeWishList(res)})
            userContext.popupAdd('Add to wishlist success!!!')
        } 
    }

    return (
        <section>
            <div className='container-home-product'>
                <div className='content-home-product'>
                    <div className='product-top'>
                        <h1>BEST SELLER</h1>
                    </div>
                    <div className='product-bot'>
                        <div className='product-shop'>
                            <Slider {...settings}>
                                {shopContext.list.map((item,key) => {
                                    return <ItemShop key={key} product={item} wishList={wishList}/>
                                })}                           
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2
};