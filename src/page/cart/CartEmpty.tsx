import React from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function 
() {
    return (
        <section>
            <div className='content-cart-empty'>
                <Link to='/shop'><i><MdOutlineAddShoppingCart/></i></Link>
                <div className='cart-empty-title'>
                    <h2>UNFORTUNATELY , YOUR CART IS EMPTY</h2> 
                    <p>Please add something in your car</p>
                    <Link to='/shop' ><button>View shop now</button></Link>
                </div>
            </div>
        </section>
    )
}
