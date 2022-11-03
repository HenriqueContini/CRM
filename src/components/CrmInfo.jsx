import './styles/CrmInfo.css';

const CrmInfo = ({subtitle, info}) => {
    return (
        <div className='crminfo-wrapper'>
            <h3 className='crminfo-subtitle'>{subtitle}</h3>
            <p className='crminfo-info'>{info}</p>
        </div>
    )
}

export default CrmInfo;