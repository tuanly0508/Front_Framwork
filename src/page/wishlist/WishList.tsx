import React, { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContext'
import { WishListContext } from '../../contexts/WishListContext'
import { wishListController } from '../../controllers/WishListController'
import { Product } from '../../model/Product'
import { WishList } from '../../model/WishList'
import ItemShop from '../shop/ItemShop'
import './WishList.css'

export default function WishLists() {
    const wishListContext = useContext(WishListContext)
    const shopContext = useContext(ShopContext)

    const wishList = (wishList:WishList) => {
        if(wishList.likes === false) wishListController.delete(wishList).then(res => {wishListContext.changeWishList(res)})
        else wishListController.create(wishList).then(res => {wishListContext.changeWishList(res)})
    }

    return (
        <React.Fragment>
            <div className="slide1">
                <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/breadcrumb.png?1627705031688" alt="" />
            </div>
            <div className='container-wishlist'>
                <div className='content-wishlist'>
                    <div className='list-right'>
                        <h1>YOUR WISHLIST</h1>
                        <div className='product-shop'>
                            {shopContext.list.map((item, key) => {
                                let a:Product = {id_product:'',id_product_line:''} 
                                {wishListContext.wishList.map((item2) => {if (item.id_product_line === item2.id_product_line) a=item })}
                                if (a.id_product_line !== '') return (<ItemShop key={key} wishList={wishList} product={a} />)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
