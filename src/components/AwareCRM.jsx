import CardCRM from './CardCRM';
import { BiSearchAlt2 } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/AwareCRM.css';

const AwareCRM = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const [CRMs, setCRMs] = useState([]);
    const [FilteredCRMs, setFilteredCRMs] = useState([]);

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

    useEffect(() => {
        setFilteredCRMs(CRMs)
    }, [CRMs])

    function handleSearch(value) {
        setFilteredCRMs(CRMs.filter((e) => e.nome_crm.toUpperCase().includes(value.toUpperCase())));
    }

    return (
        <section className='awarecrm-section'>
            <form className='awarecrm-form'>
                <input className='awarecrm-form-input' type="search" placeholder='Busque pelo nome de uma CRM' onChange={(e) => handleSearch(e.target.value)}/>
            </form>

            <div className='awarecrm-cards'>
                {FilteredCRMs.map(crm => (
                    <CardCRM key={crm.id} crm_id={crm.id} crm_name={crm.nome_crm} author={crm.requerente} description={crm.descricao} date={crm.data_criacao} />
                ))}
            </div>
        </section>
    )
}

export default AwareCRM;