import CrmInfo from '../components/CrmInfo';
import { AiFillFilePdf, AiFillFileWord, AiFillCloseCircle, AiFillCheckCircle, AiFillClockCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles/Crm.css';

const Crm = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    const { id } = useParams();
    const [CRM, setCRM] = useState({});
    const [Departments, setDepartments] = useState([])

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
                    <CrmInfo subtitle='Nome da CRM' info={CRM.nome_crm} />
                    <CrmInfo subtitle='Número da CRM' info={CRM.numero_crm} />
                    <CrmInfo subtitle='Versão' info={CRM.versao} />
                    <CrmInfo subtitle='Data de criação' info={`${new Date(CRM.data_criacao).getDate()}/${new Date(CRM.data_criacao).getMonth()}/${new Date(CRM.data_criacao).getFullYear()}`} />
                    <CrmInfo subtitle='Setor' info={CRM.setor} />
                    <CrmInfo subtitle='Requerente' info={CRM.requerente} />
                    <CrmInfo subtitle='E-mail:' info={CRM.email} />
                </article>
                <article className='crm-article'>
                    <h2 className='crm-article-title'>Sobre</h2>
                    <CrmInfo subtitle='A necessidade de:' info={CRM.necessidade} />
                    <CrmInfo subtitle='Impacto:' info={CRM.impacto} />
                </article>
                <article className='crm-article'>
                    <h2 className='crm-article-title'>Informações</h2>
                    <CrmInfo subtitle='Descrição da demanda:' info={CRM.descricao} />
                    <CrmInfo subtitle='Objetivo a ser atendido:' info={CRM.objetivo} />
                    <CrmInfo subtitle='Justificativa:' info={CRM.justificativa} />
                    <CrmInfo subtitle='Alternativas:' info={CRM.alternativa} />
                    <CrmInfo subtitle='Sistemas envolvidos na mudança:' info={CRM.sistemas_envolvidos} />
                    <CrmInfo subtitle='Comportamento offline:' info={CRM.comportamento_offline} />
                    <CrmInfo subtitle='Esta CRM depende de outro desenvolvimento?' info={CRM.dependencia} />
                </article>

                <article className="crm-article">
                    <h2 className="crm-article-title">Arquivos</h2>
                    <div className='crm-article-file'>
                        <AiFillFilePdf className='crm-article-fileImage' />
                        <p className="crm-article-fileName">ArquivoComplementar.pdf</p>
                    </div>
                    <div className='crm-article-file'>
                        <AiFillFileWord className='crm-article-fileImage' />
                        <p className="crm-article-fileName">TextoComplementar.docx</p>
                    </div>
                </article>

                <article className="crm-article">
                    <h2 className="crm-article-title">Setores envolvidos</h2>
                    <div className="crm-aware-list">
                        {Departments.map(d => (
                            <div className="crm-aware-item" key={d.id_aprovacao}>
                                <p className="crm-aware-department">{d.setor}</p>
                                <p className="crm-aware-user">{d.responsavel}</p>
                                {d.decisao === 'Pendente' ? <AiFillClockCircle className='crm-aware-img aware-pending' /> : null}
                                {d.decisao === 'Aceitado' ? <AiFillCheckCircle className='crm-aware-img aware-accepted' /> : null}
                                {d.decisao === 'Rejeitado' ? <AiFillCloseCircle className='crm-aware-img aware-rejected' /> : null}
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            {CRM.requerente_matricula === user.matricula ?
                <section className='crm-edit'>
                    <Link to='/newcrm' className='crm-edit-button'>Editar CRM</Link>
                </section>
                
                : null
            }
        </section>
    )
}

export default Crm;