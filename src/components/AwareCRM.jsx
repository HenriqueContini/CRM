import CardCRM from './CardCRM';
import { BiSearchAlt2 } from 'react-icons/bi'
import './styles/AwareCRM.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AwareCRM = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const [CRMs, setCRMs] = useState([]);

    useEffect(() => {
        if (user) {
            let urlAPI = `http://localhost:8080/crm/awarecrms/${user.matricula}`;

            fetch(urlAPI)
                .then(r => r.json())
                .then(json => setCRMs(json))
        } else {
            navigate('/')
        }
    }, [])

    return (
        <section className='awarecrm-section'>
            <form className='awarecrm-form'>
                <input className='awarecrm-form-input' type="text" placeholder='Busque pelo nome de uma CRM' />
                <button className='awarecrm-form-button' type='submit'><BiSearchAlt2 /></button>
            </form>

            <div className='awarecrm-cards'>
                {CRMs != undefined && CRMs.map(crm => (
                    <CardCRM key={crm.id} crm_id={crm.id} crm_name={crm.nome_crm} author={crm.requerente} description={crm.descricao} date={crm.data_criacao} />
                ))}
            </div>
        </section>
    )
}

export default AwareCRM;