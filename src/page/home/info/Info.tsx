import { Link } from 'react-router-dom'
import './Info.css'

export default function Info() {
    return (
        <section>
            <div className='container-info'>
                <div className='content-info'>
                    <div className='info-top'>
                        <h2>Welcome to Catchy Pet</h2>
                        <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/bg-title.png?1634204985129" alt="" />
                    </div>
                    <div className='info-bot'>
                        <div className='info'>
                            <Link to=''><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/welcome_1.png?1639287465667" alt="dog" /></Link>
                            <h2>FOR DOG </h2>
                            <p>Pet dogs, dog toys and specialized products for dogs</p>
                        </div>
                        <div className='info'>
                            <Link to=''><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/welcome_2.png?1639287465667" alt="cat" /></Link>
                            <h2>FOR CAT</h2>
                            <p>Pet cats, cats toys and specialized products for cats</p>
                        </div>
                        <div className='info'>
                            <Link to=''><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/welcome_3.png?1639287465667" alt="hamster" /></Link>
                            <h2>FOR HAMSTER</h2>
                            <p>Pet hamsters, hamsters toys and specialized products for hamsters</p>
                        </div>
                        <div className='info'>
                            <Link to=''><img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/welcome_4.png?1639287465667" alt="dog" /></Link>
                            <h2>FOR BIRD</h2>
                            <p>Pet birds, birds toys and specialized products for birds</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
