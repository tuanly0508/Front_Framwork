import { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { ShopContext } from '../../contexts/ShopContext'
import { UserContext } from '../../contexts/UserContext'
import { cartController } from '../../controllers/CartController'
import { productController } from '../../controllers/ProductController'
import { Age } from '../../model/Age'
import { Cart } from '../../model/Cart'
import { Image } from '../../model/Image'
import { Product } from '../../model/Product'
import { Weight } from '../../model/Weight'
import './css/ProductDetail.css'
import Description from './product/Description'
import ProductLeft from './product/ProductLeft'
import ProductRight from './product/ProductRight'
import RelatedProduct from './RelatedProduct'

type State = {
    image:Image[]
    product: Product[]
    count: number
    idWeight:string
    dataWeight: Weight[]
    idProduct: string
    productDetail: Product
    price: number
    dataAge: Age[]
    nameAge: {id : string , value : string}[]
    sellCount:number
    list:Product[]
}

export default function ProductDetail() {
    const isInitialMount = useRef(true);
    const userContext = useContext(UserContext)
    const cartContext = useContext(CartContext)
    const shopContext = useContext(ShopContext)

    const [state,setState] = useState<State>({
        image: [],
        product: [],
        count:1,
        idWeight: '',
        dataWeight: [],
        idProduct:'',
        productDetail: {id_product:'',id_product_line:'',name_product:'',name_brand:''},
        price:0,
        dataAge: [],
        nameAge:[],
        sellCount:0,
        list: []
    })

    useEffect(() => {
        let a : { id : string , value : string}[] = []
        if (isInitialMount.current) {
            isInitialMount.current = false
            productController.getDetail(shopContext.idProductLine).then(res => {
                res.age.map((item:any) => {
                    if(item.id_weight===res.age[0].id_weight) {
                        a.push({id:item.id_product,value:item.name_age })
                    }
                    return item
                })
                setState(prev => ({...prev,nameAge:a,image:res.image,product:res.product,dataWeight:res.weight,productDetail:res.product[0],
                    price:res.product[0].price,dataAge:res.age,nameWeight:res.product[0].name_weight,sellCount:res.product[0].sell_count}
                ))
            })
        }else {
            state.dataAge.map((item:any) => {
                if(state.idWeight === item.id_weight) {
                    a.push({id:item.id_product,value:item.name_age })
                }
                return item
            })
            state.product.map((item) => {
                if(state.idWeight === item.id_weight) {
                    if(state.idProduct === item.id_product) {
                        setState(prev=>({...prev,price: item.price as number}))
                    }
                }
                return item
            })
        }
        setState(prev=>({...prev,nameAge:a}))
    },[state.idWeight,state.idProduct])

    const idWeight = (idWeight:string) => {
        setState(prev=>({...prev,idWeight:idWeight}))
    }

    const idProduct = (idProduct:string) => {
        setState(prev=>({...prev,idProduct:idProduct}))
    }

    const handleAddCart = (cart:Cart) => {
        cartController.create(cart).then(res => {
            cartContext.changeDataCart(res.dataCart,res.totalPrice)
        })
        userContext.popupAdd('Add to cart success !!!')
    }
    
    return (
        <section>
            <div className="slide1">
                <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/breadcrumb.png?1627705031688" alt="" />
            </div>
            <div className='container-product-detail'>
                <div className='content-product-detail'>
                    <div className='content-product-top'>
                        <ProductLeft image={state.image} />
                        <div className='product-right'>
                            <ProductRight handleAddCart={handleAddCart} sellCount={state.sellCount} idProduct={idProduct} idWeight={idWeight} nameAge={state.nameAge} dataAge={state.dataAge} price={state.price} product={state.product} 
                                productDetail={state.productDetail} dataWeight={state.dataWeight} 
                            />
                        </div>
                    </div>
                    <Description/>
                    <div className='content-product-bot'>
                        <div className='product-bot-title'>
                            <h2>Related Products</h2>
                            <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/bg-title.png?1634204985129" alt="" />
                        </div>
                        <RelatedProduct list={state.list} />
                    </div>
                </div>
            </div>
        </section>
    )
}
