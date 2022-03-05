import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../contexts/ShopContext";
import { Product } from "../../model/Product";
import { BsCartPlus, BsHeartFill } from 'react-icons/bs'
import { GrSettingsOption } from 'react-icons/gr'
import { WishListContext } from "../../contexts/WishListContext";
import { WishList } from "../../model/WishList";
import { UserContext } from "../../contexts/UserContext";


export interface Props {
    product: Product
    wishList: (wishList:WishList) => void
}

type State = {
    wishList: WishList
}

export default function ItemShop(props: Props) {
    const wishListContext = useContext(WishListContext)
    const userContext = useContext(UserContext)
    const shopContext = useContext(ShopContext)
    
    const [state,setState] = useState<State>({
        wishList: {id_product_line:'',id_user:'',likes:false}
    })

    useEffect(() => {
        if(state.wishList.id_product_line !== '') props.wishList(state.wishList)
    },[state.wishList])
    
    const handleGetIdProductLine = () => {
        shopContext.changeIdProductLine(props.product.id_product_line, props.product.id_product, props.product.id_brand as string)
    }

    const handleWishlist = (like:boolean) => {    
        setState(prev=> ({...prev,wishList:{...prev.wishList,id_product_line:props.product.id_product_line,id_user:userContext.user.id_user,likes:like}}))  
    }

    return (
        <div className='product-detail'>
            <span></span><span></span><span></span><span></span>
            <div className="sold-shop">Sold:{props.product.sell_count}</div>
            <img src={props.product.image} alt="" />
            <div className="icon-wish-list">
                <div>
                    <i >
                        {wishListContext.wishList.map((item, key) => {
                            if (props.product.id_product_line === item.id_product_line) return <BsHeartFill onClick={e=>handleWishlist(false)} key={key} style={{ color: 'red', position: 'absolute' }} />
                        })}
                        <BsHeartFill onClick={e=>handleWishlist(true)} style={{ border: ' 1px solid white', color: '#555555' }} />
                    </i>
                </div>

                <i ><BsCartPlus /></i>
                <Link to='/detail'><i onClick={handleGetIdProductLine}><GrSettingsOption /></i></Link>

            </div>
            <h1>{props.product.name_product}</h1>
            <p>{props.product.price} $</p>
        </div>

    )
}
