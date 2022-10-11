import './styles/CrmInfo.css';

const CrmInfo = ({subtitle, info}) => {
    return (
        <>
            <h3 className='crminfo-subtitle'>{subtitle}</h3>
            <p className='crminfo-info'>{info}</p>
        </>
    )
}

export default CrmInfo;