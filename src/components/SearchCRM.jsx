import { useForm } from 'react-hook-form';
import CardCRM from './CardCRM';
import './styles/SearchCRM.css';

const SearchCRM = () => {
    const {register, handleSubmit} = useForm();

    return (
        <section className='search-section'>
            <h1 className='search-title'>Busque por uma CRM</h1>

            <form className='search-form' onSubmit={handleSubmit((data) => console.log(data))}>
                <label htmlFor="num_crm">Número da CRM:</label>
                <input type="number" id='num_crm' {...register('num_crm')} placeholder="Número CRM"/>
                <label htmlFor="nome">Nome da CRM:</label>
                <input type="text" id='nome' {...register('nome')} placeholder="Nome da CRM"/>
                <label htmlFor="usuario">Usuário:</label>
                <input type="text" id='usuario' {...register('usuario')} placeholder="Nome do usuário"/>
                <label htmlFor="data">Data da CRM:</label>
                <input type="date" id='data' {...register('data')} placeholder="Número CRM"/>

                <button type="submit">Buscar</button>
            </form>

            <h2 className='search-title'>Resultado:</h2>
            <div className='search-result'>
                <CardCRM />
                <CardCRM />
            </div>
        </section>
    )
}

export default SearchCRM;