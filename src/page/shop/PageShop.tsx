import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import '../shop/css/PageShop.css'
import { useContext, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ItemShop from './ItemShop'
import { PaginationModel } from '../../model/Pagination'
import Pagination from '../../components/pagination/Pagination'
import { WishList } from '../../model/WishList'
import { ShopContext } from '../../contexts/ShopContext'
import { wishListController } from '../../controllers/WishListController'
import { WishListContext } from '../../contexts/WishListContext'
import { UserContext } from '../../contexts/UserContext'

type State = {
    search: string
    wishList: WishList
    pagination: PaginationModel
}

export default function PageShop() {
    const wishListContext = useContext(WishListContext)
    const userContext = useContext(UserContext)
    const shopContext = useContext(ShopContext)
    const [state, setState] = useState<State>({
        search: '',
        pagination: { size: 0, page: 1, search: '', field: '', sort: '', countPage: 1 },
        wishList: { id_product_line: '', id_user: '', likes: false }
    })

    const onSearch = () => {
        shopContext.changeSort('','',state.search)
    }

    const handleChange = (e: any) => {
        const a = e.target.value
        if (a === 'nameUp') {
            shopContext.changeSort('name_product','asc','')
        } else if (a === 'nameDown') {
            shopContext.changeSort('name_product','desc','')
        } else if (a === 'priceUp') {
            shopContext.changeSort('price','asc','')
        } else if (a === 'sellUp') {
            shopContext.changeSort('sellCount','asc','')
        } else if (a === 'sellDown') {
            shopContext.changeSort('sellCount','desc','')
        } else {
            shopContext.changeSort('price','desc','')
        }
    }

    const handleBrand = (e: any) => {
        const a = e.target.value
        if (!a) shopContext.changeSort('','','')
        else shopContext.changeSort('name_brand','',a)
    }

    const page = (page: number) => {
        shopContext.changePage(page)
    }

    const wishList = (wishList:WishList) => {
        if(wishList.likes === false) {
            wishListController.delete(wishList).then(res => {wishListContext.changeWishList(res)})
            userContext.popupAdd('Remove wishlist success !!!')
        }else {
            wishListController.create(wishList).then(res => {wishListContext.changeWishList(res)})
            userContext.popupAdd('Add to wishlist success !!!')
        } 
    }

    const displayItemShop = shopContext.list.map((item, key) => {
        return (
            <ItemShop key={key} wishList={wishList} product={item} />
        )
    })

    return (
        <section>
            <div className="container-shop">
                <div className="content-shop">
                    <div className="slide1">
                        <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/breadcrumb.png?1627705031688" alt="" />
                    </div>
                    <div className="list-product">
                        <div className="list">
                            <div className='list-left'>
                                <h1>SORTED BY</h1>
                                <div className='brand'>
                                    <RadioGroup onChange={handleChange} aria-label="gender" name="radio-buttons-group">
                                        <li><FormControlLabel value="nameUp" control={<Radio />} label="Sort A - Z" /></li>
                                        <li><FormControlLabel value="nameDown" control={<Radio />} label="Sort Z - A" /></li>
                                        <li><FormControlLabel value="priceUp" control={<Radio />} label="Sort price up" /></li>
                                        <li><FormControlLabel value="priceDown" control={<Radio />} label="Sort price down" /></li>
                                        <li><FormControlLabel value="sellUp" control={<Radio />} label="Sold up" /></li>
                                        <li><FormControlLabel value="sellDown" control={<Radio />} label="Sold down" /></li>
                                    </RadioGroup>
                                </div>
                                <h1>SELECT BRAND</h1>
                                <div className='input'>
                                    <input onChange={e => setState(prev => ({ ...prev, search: e.target.value }))} type="text" placeholder='Search...' />
                                    <i onClick={onSearch} ><FaSearch /></i>
                                </div>
                                <div className='brand'>
                                    <RadioGroup onChange={handleBrand} aria-label="gender" name="radio-buttons-group">
                                        <li><FormControlLabel value='' control={<Radio />} label='All' /></li>
                                        {shopContext.brand.map((item, key) => {
                                            return (
                                                <li key={key}><FormControlLabel value={item.name_brand} control={<Radio />} label={item.name_brand} /></li>
                                            )
                                        })}
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className='list-right'>
                                <h1>ALL PRODUCT</h1>
                                <div className='product-shop'>
                                    {displayItemShop}
                                </div>
                            </div>
                        </div>
                        <Pagination page={page} pageCount={shopContext.pagination.countPage as number} />
                    </div>
                </div>
            </div>
            
        </section>
    )
}