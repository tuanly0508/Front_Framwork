import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemShop from "../shop/ItemShop";
import { Product } from "../../model/Product";
import { useState } from "react";
import { WishList } from "../../model/WishList";

interface Props {
    list: Product[]
}

type State = {
    idProductLine:string
}

export default function RelatedProduct(props:Props) {
    const[state,setState] = useState<State> ({
        idProductLine:''
    })

    const idProductLine = (idProductLine: string) => {
        setState(prev => ({ ...prev, idProductLine: idProductLine }))
    }

    const wishList = (wishList:WishList) => {
        console.log(wishList);
        
    }
    
    return (
        <section>
            <div className='product-bot'>
                <Slider {...settings}>
                    {props.list.map((item,key) => {
                        // return (
                        //     <ItemShop key={key} product={item}  idProductLine={idProductLine}/>
                        // )
                    })}
                </Slider>
            </div>
        </section>
    )
}

const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1
};