import CardCRM from './CardCRM';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/UserCRM.css';

const UserCRM = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const location = useLocation();
    const navigate = useNavigate();
    const [CRMs, setCRMs] = useState([]);
    const [FilteredCRMs, setFilteredCRMs] = useState([]);
    
    useEffect(() => {
        if(user) {
            let urlAPI = `http://localhost:8080/crm/usercrms/${user.matricula}`;
            
            fetch(urlAPI)
                .then(r => r.json())
                .then(json => setCRMs(json))
        } else {
            navigate('/')
        }
    }, [location.pathname])

    useEffect(() => {
        setFilteredCRMs(CRMs)
    }, [CRMs])

    function handleSearch(value) {
        setFilteredCRMs(CRMs.filter((e) => e.nome_crm.toUpperCase().includes(value.toUpperCase())));
    }

    return (
        <section className='usercrm-section'>
            <form className='usercrm-form'>
                <input className='usercrm-form-input' type="search" placeholder='Busque pelo nome de uma CRM' onChange={(e) => handleSearch(e.target.value)}/>
            </form>

            <div className='usercrm-cards'>
                {FilteredCRMs.map(crm => (
                    <CardCRM key={crm.id} crm_number={crm.numero_crm} status={crm.status_crm} crm_version={crm.versao} crm_id={crm.id} crm_name={crm.nome_crm} author={crm.requerente} description={crm.descricao} date={crm.data_criacao}/>
                ))}
            </div>
        </section>
    )
}

export default UserCRM;