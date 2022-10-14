import './styles/CardCRM.css';

// Cada card deve receber como props um id, com este id será feito a requisição na API para gerar os dados e será o mesmo id para o useNavegation

const CardCRM = () => {
    return (
        <div className='card-crm'>
            <h2 className='card-title'>Melhoria na API de pagamento</h2>
            <p className='card-author'>Henrique Contini</p>
            <article className='card-article'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </article>
            <p className='card-date'>15/08/2021</p>
        </div>
    )
}

export default CardCRM;