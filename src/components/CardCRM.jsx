import { useNavigate } from 'react-router-dom';

import './styles/CardCRM.css';

const CardCRM = ({crm_id, crm_number, crm_version, crm_name, status, author, description, date}) => {
    const navigate = useNavigate();

    const fDate = new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    const handleNavigate = (id) => {
        navigate(`/crm/${id}`);
    }

    return (
        <div className='card-crm' onClick={() => handleNavigate(crm_id)}>
            <div className='card-crm-data'>
                <p className='card-number'>Nº {crm_number}</p>
                <p className='card-version'>V {crm_version}</p>
            </div>
            <h2 className='card-title'>{crm_name}</h2>
            <p className='card-author'>{author}</p>
            {status === 'Pendente' ? <p className="card-status pending">Pendente</p> : null}
            {status === 'Aprovado' ? <p className="card-status accepted">Aprovado</p> : null}
            {status === 'Rejeitado' ? <p className="card-status rejected">Rejeitado</p> : null}
            
            <article className='card-article'>{description}</article>
            <p className='card-date'>{fDate}</p>
        </div>
    )
}

export default CardCRM;