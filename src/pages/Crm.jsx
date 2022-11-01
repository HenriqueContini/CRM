import CrmInfo from '../components/CrmInfo';
import { AiFillFilePdf, AiFillFileWord, AiFillCloseCircle, AiFillCheckCircle, AiFillClockCircle } from 'react-icons/ai';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './styles/Crm.css';

const Crm = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();
    const [CRM, setCRM] = useState({});
    const [Departments, setDepartments] = useState([]);
    const [CRMDecision, setCRMDecision] = useState('');

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

    async function setDecision(data) {
        data.aprovado = CRMDecision;
        data.user = user.matricula;

        try {
            let urlDecision = `http://localhost:8080/approval/putdecision/${id}`;
            let response = await fetch(urlDecision, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let json = await response.json();

            loadData();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (user) {
            loadData();
        } else {
            navigate('/')
        }
    }, []);

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
                    {CRM.necessidade ? <CrmInfo subtitle='A necessidade de:' info={CRM.necessidade} /> : null}
                    {CRM.impacto ? <CrmInfo subtitle='Impacto:' info={CRM.impacto} /> : null}
                </article>
                <article className='crm-article'>
                    <h2 className='crm-article-title'>Informações</h2>
                    {CRM.descricao ? <CrmInfo subtitle='Descrição da demanda:' info={CRM.descricao} /> : null}
                    {CRM.objetivo ? <CrmInfo subtitle='Objetivo a ser atendido:' info={CRM.objetivo} />: null}
                    {CRM.justificativa ? <CrmInfo subtitle='Justificativa:' info={CRM.justificativa} />: null}
                    {CRM.alternativa ? <CrmInfo subtitle='Alternativas:' info={CRM.alternativa} />: null}
                    {CRM.sistemas_envolvidos ? <CrmInfo subtitle='Sistemas envolvidos na mudança:' info={CRM.sistemas_envolvidos} />: null}
                    {CRM.comportamento_offline ? <CrmInfo subtitle='Comportamento offline:' info={CRM.comportamento_offline} />: null}
                    {CRM.dependencia ? <CrmInfo subtitle='Esta CRM depende de outro desenvolvimento?' info={CRM.dependencia} />: null}
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
                                {d.decisao === 'Aprovado' ? <AiFillCheckCircle className='crm-aware-img aware-accepted' /> : null}
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

            {/* let foo = teste.find(d => d.setor === "TI" && d.decisao === 'Aprovado') */}

            {(Departments.find(d => d.decisao === 'Pendente' && d.cod_setor === user.setor)) !== undefined ?
                <section className='crm-decision'>
                    <h2 className="crm-decision-title">Ciência</h2>

                    <div className="crm-decision-buttons">
                        <div className='crm-decision-option accept' onClick={() => setCRMDecision(true)}>
                            {CRMDecision === true ? <BiCheckboxChecked /> : <BiCheckbox />}
                            <p>Aceitar</p>
                        </div>
                        <div className='crm-decision-option reject' onClick={() => setCRMDecision(false)}>
                            {CRMDecision === false ? <BiCheckboxChecked /> : <BiCheckbox />}
                            <p>Rejeitar</p>
                        </div>
                    </div>

                    <form className='crm-decision-form' onSubmit={handleSubmit((data) => (setDecision(data), reset()))}>
                        <label htmlFor="comentario">Comentário:</label>
                        <textarea id="comentario" {...register('comentario')} placeholder="Adicione um comentário"></textarea>

                        <button type="submit" className="crm-decision-submit">Enviar decisão</button>
                    </form>
                </section>

                : null
            }

        </section>
    )
}

export default Crm;