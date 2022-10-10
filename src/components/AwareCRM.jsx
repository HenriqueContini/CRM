import CardCRM from './CardCRM';
import { BiSearchAlt2 } from 'react-icons/bi'
import './AwareCRM.css';

const AwareCRM = () => {
    return (
        <section className='awarecrm-section'>
            <form className='awarecrm-form'>
                <input className='awarecrm-form-input' type="text" placeholder='Busque pelo nome de uma CRM' />
                <button className='awarecrm-form-button' type='submit'><BiSearchAlt2 /></button>
            </form>

            <div className='awarecrm-cards'>
                <CardCRM />
                <CardCRM />
            </div>
        </section>
    )
}

export default AwareCRM;