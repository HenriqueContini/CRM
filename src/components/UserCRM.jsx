import CardCRM from './CardCRM';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import './styles/UserCRM.css';
import { useNavigate } from 'react-router-dom';

const UserCRM = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const [CRMs, setCRMs] = useState([]);
    
    useEffect(() => {
        if(user) {
            let urlAPI = `http://localhost:8080/crm/usercrms/${user.matricula}`;
            
            fetch(urlAPI)
                .then(r => r.json())
                .then(json => setCRMs(json))
        } else {
            navigate('/')
        }
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