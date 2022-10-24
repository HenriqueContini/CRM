import CardCRM from './CardCRM';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import './styles/UserCRM.css';

const UserCRM = () => {

    const urlAPI = 'http://localhost:8080/crm/usercrms/00001';

    const [CRMs, setCRMs] = useState([]);

    useEffect(() => {
        fetch(urlAPI)
            .then(r => r.json())
            .then(json => setCRMs(json))
    }, [])

    return (
        <section className='usercrm-section'>
            <form className='usercrm-form'>
                <input className='usercrm-form-input' type="text" placeholder='Busque pelo nome de uma CRM' />
                <button className='usercrm-form-button' type='submit'><BiSearchAlt2 /></button>
            </form>

            <div className='usercrm-cards'>
                {CRMs != undefined && CRMs.map(crm => (
                    <CardCRM key={crm.id} crm_name={crm.nome_crm} author={crm.requerente} description={crm.descricao} date={crm.data_criacao}/>
                ))}
            </div>
        </section>
    )
}

export default UserCRM;