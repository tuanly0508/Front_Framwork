import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
    return (
        <section>
            <div className='container-footer'>
                <div className='content-footer'>
                    <div className='footer-top'>
                        <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/logo-footer.png?1639287465667" alt="" />
                    </div>
                    <div className='footer-mid'>
                        <div className='link'>
                            <li>HOME</li>
                            <li>SHOP</li>
                            <li>PRICE LIST</li>
                            <li>NEWS</li>
                            <li>BOOKING</li>
                            <li>CONTACT</li>
                        </div>
                        <div className='social'>
                            <i><FaFacebook/></i>
                            <i><FaInstagram/></i>
                            <i><FaTwitter/></i>
                            <i><FaTiktok/></i>
                            <i><FaYoutube/></i>
                        </div>
                    </div>
                    <div className='footer-bot'>
                        <p>@ Copy right of Black_IT | TTA</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
