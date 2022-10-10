import CardCRM from './CardCRM';
import { BiSearchAlt2 } from 'react-icons/bi'
import './UserCRM.css';

const UserCRM = () => {
    return (
        <section className='usercrm-section'>
            <form className='usercrm-form'>
                <input className='usercrm-form-input' type="text" placeholder='Busque pelo nome de uma CRM' />
                <button className='usercrm-form-button' type='submit'><BiSearchAlt2 /></button>
            </form>

            <CardCRM />
        </section>
    )
}

export default UserCRM;