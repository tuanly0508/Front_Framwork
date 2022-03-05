import Info from './info/Info';
import News from './news/News';
import BestSeller from './product/BestSeller';
import Service from './service/Service';

export default function HomePage() {
    return (
        <section>
            <div className='container-home'>
                <div className='content-home'>
                    <div className='slide-1'>
                        <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/slider_1.png?1639287465667" alt="slide1" />
                    </div>
                    <Info/>
                    <BestSeller/>
                    <div className='slide-2'>
                        <img src="https://bizweb.dktcdn.net/100/432/370/themes/828992/assets/banner_index.png?1639287465667" alt="slide1" />
                    </div>
                    <Service/>
                    <News/>
                </div>
            </div>
        </section>
    )
}
