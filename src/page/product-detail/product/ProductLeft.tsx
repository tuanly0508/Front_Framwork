import { Carousel } from 'react-responsive-carousel'
import {Image} from '../../../model/Image'
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
    image: Image[]
}

export default function ProductImage(props:Props) {
    
    return (
        <Carousel>
            {props.image.map((item,key) => {
                return(
                    <div key={key}><img style={{width:'70%'}} src={item.image} alt="" /></div>
                )
            })}
        </Carousel>
    )
}
