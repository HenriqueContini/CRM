import CrmInfo from '../components/CrmInfo';
import {AiFillFilePdf, AiFillFileWord, AiFillCloseCircle, AiFillCheckCircle, AiFillClockCircle} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/Crm.css';

const Crm = () => {
    const {id} = useParams();
    const [CRM, setCRM] = useState({});
    const [Departments, setDepartments] = useState({})
    
    async function loadData() {
        try {
            let urlAPI = `http://localhost:8080/crm/getcrm/${id}`;
            let response = await fetch(urlAPI);
            let json = await response.json();
            setCRM(json.crm);
            setDepartments(json.setores);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <section className="crm-container">
            <h1 className="crm-title">Visualizar CRM</h1>

            <section className="crm-wrapper">
                <article className='crm-article'>
                    <h2 className='crm-article-title'>CRM</h2>
                    <CrmInfo subtitle='Nome da CRM' info={CRM.nome_crm}/>
                    <CrmInfo subtitle='Número da CRM' info={CRM.numero_crm}/>
                    <CrmInfo subtitle='Versão' info={CRM.versao}/>
                    <CrmInfo subtitle='Data de criação' info={`${new Date(CRM.data_criacao).getDate()}/${new Date(CRM.data_criacao).getMonth()}/${new Date(CRM.data_criacao).getFullYear()}`}/>
                    <CrmInfo subtitle='Requerente' info={CRM.requerente}/>
                    <CrmInfo subtitle='Setor' info={CRM.setor}/>
                    <CrmInfo subtitle='Telefone ou ramal' info='19 9 99991234'/>
                    <CrmInfo subtitle='E-mail:' info='henrique@gmail.com'/>
                </article>
                <article className='crm-article'>
                    <h2 className='crm-article-title'>Sobre</h2>
                    <CrmInfo subtitle='A necessidade de:' info={CRM.necessidade}/>
                    <CrmInfo subtitle='Impacto:' info={CRM.impacto}/>
                </article>
                <article className='crm-article'>
                    <h2 className='crm-article-title'>Informações</h2>
                    <CrmInfo subtitle='Descrição da demanda:' info={CRM.descricao}/>
                    <CrmInfo subtitle='Objetivo a ser atendido:' info={CRM.objetivo}/>
                    <CrmInfo subtitle='Justificativa:' info={CRM.justificativa}/>
                    <CrmInfo subtitle='Alternativas:' info={CRM.alternativa}/>
                    <CrmInfo subtitle='Sistemas envolvidos na mudança:' info={CRM.sistemas_envolvidos}/>
                    <CrmInfo subtitle='Comportamento offline:' info={CRM.comportamento_offline}/>
                    <CrmInfo subtitle='Esta CRM depende de outro desenvolvimento?' info={CRM.dependencia}/>
                </article>

                <article className="crm-article">
                    <h2 className="crm-article-title">Arquivos</h2>
                    <div className='crm-article-file'>
                        <AiFillFilePdf className='crm-article-fileImage'/>
                        <p className="crm-article-fileName">ArquivoComplementar.pdf</p>
                    </div>
                    <div className='crm-article-file'>
                        <AiFillFileWord className='crm-article-fileImage'/>
                        <p className="crm-article-fileName">TextoComplementar.docx</p>
                    </div>
                </article>

                <article className="crm-article">
                    <h2 className="crm-article-title">Setores envolvidos</h2>
                    <div className="crm-aware-list">
                        {Departments.map(deparment => ('Continuação'))}
                        <div className="crm-aware-item">
                            <p className="crm-aware-department">Controladoria</p>
                            <p className="crm-aware-user">Fulano</p>
                            <AiFillCheckCircle className='crm-aware-img aware-accepted'/>
                        </div>
                        <div className="crm-aware-item">
                            <p className="crm-aware-department">Fiscal</p>
                            <p className="crm-aware-user"></p>
                            <AiFillClockCircle className='crm-aware-img aware-pending'/>
                        </div>
                        <div className="crm-aware-item">
                            <p className="crm-aware-department">Outro setor</p>
                            <p className="crm-aware-user">Outro fulano</p>
                            <AiFillCloseCircle className='crm-aware-img aware-rejected'/>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    )
}

export default Crm;