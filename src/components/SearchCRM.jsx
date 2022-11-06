import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CardCRM from './CardCRM';
import './styles/SearchCRM.css';

const SearchCRM = () => {
    const {register, handleSubmit} = useForm();
    const [CRMs, setCRMs] = useState([]);

    // http://localhost:8080/crm/search?nome_crm=teste&requerente=Henrique&data=19%2F6%2F2020

    const search = async(data) => {
        let arrParams = [];

        for (let key in data) {
            if(data[key]) {
                arrParams.push(`${key}=${data[key]}`);
            }
        }

        const params = arrParams.join('&');
        const searchURL = `http://localhost:8080/crm/search?${params}`;

        fetch(searchURL)
            .then(r => r.json())
            .then(json => setCRMs(json))
    }

    return (
        <section className='search-section'>
            <h1 className='search-title'>Busque por uma CRM</h1>

            <form className='search-form' onSubmit={handleSubmit((data) => search(data))}>
                <label htmlFor="numero_crm">Número da CRM:</label>
                <input type="number" id='numero_crm' {...register('numero_crm')} placeholder="Número CRM"/>
                <label htmlFor="nome_crm">Nome da CRM:</label>
                <input type="search" id='nome_crm' {...register('nome_crm')} placeholder="Nome da CRM"/>
                <label htmlFor="requerente">Usuário:</label>
                <input type="search" id='requerente' {...register('requerente')} placeholder="Nome do usuário"/>
                <label htmlFor="data_criacao">Data de criação da CRM:</label>
                <input type="date" id='data_criacao' {...register('data_criacao')} placeholder="Número CRM"/>

                <button type="submit">Buscar</button>
            </form>

            <h2 className='search-title'>Resultado:</h2>
            <div className='search-result'>
            <div className='usercrm-cards'>
                {CRMs.map(crm => (
                    <CardCRM key={crm.id} crm_id={crm.id} crm_name={crm.nome_crm} author={crm.requerente} description={crm.descricao} date={crm.data_criacao}/>
                ))}
            </div>
            </div>
        </section>
    )
}

export default SearchCRM;