import { useNavigate } from 'react-router-dom';

import './styles/CardCRM.css';

const CardCRM = ({crm_id, crm_name, author, description, date}) => {
    const navigate = useNavigate();

    const fDate = new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    const handleNavigate = (id) => {
        navigate(`/crm/${id}`);
    }

    return (
        <div className='card-crm' onClick={() => handleNavigate(crm_id)}>
            <h2 className='card-title'>{crm_name}</h2>
            <p className='card-author'>{author}</p>
            <article className='card-article'>{description}</article>
            <p className='card-date'>{fDate}</p>
        </div>
    )
}

export default CardCRM;