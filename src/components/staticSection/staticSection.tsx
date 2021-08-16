import './staticSection.scss';

export const StaticSection = () => {
    const subTextBg = require('../../assets/sub-text-bg.png');

    return (
        <section>
            <div className='journal-section__head'>Journal</div>
            <div className='journal-section__cntr'>
                <div className='journal-section__sub-text'>Think, Write and Create your Journal</div>
                <div className='journal-section__img'>
                    <img src={subTextBg}/>
                </div>
            </div>
        </section>
    )
}