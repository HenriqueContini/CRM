import './styles/CardCRM.css';

const CardCRM = ({crm_name, author, description, date}) => {
    const fDate = new Date(date);

    return (
        <div className='card-crm'>
            <h2 className='card-title'>{crm_name}</h2>
            <p className='card-author'>{author}</p>
            <article className='card-article'>{description}</article>
            <p className='card-date'>{`${fDate.getDate()}/${fDate.getMonth()}/${fDate.getFullYear()}`}</p>
        </div>
    )
}

export default CardCRM;