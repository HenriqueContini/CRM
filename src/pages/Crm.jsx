import CrmInfo from '../components/CrmInfo';
import {
    AiFillFilePdf, AiFillFileWord, AiFillFilePpt, AiOutlineFileJpg,
    AiFillFileImage, AiFillFileText, AiFillCloseCircle, AiFillCheckCircle, AiFillClockCircle
} from 'react-icons/ai';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './styles/Crm.css';

const Crm = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const [CRM, setCRM] = useState({});
    const [Departments, setDepartments] = useState([]);
    const [CRMVersions, setCRMVersions] = useState([]);
    const [CRMDecision, setCRMDecision] = useState('');
    const [CRMFiles, setCRMFiles] = useState([]);
    const [AllowIT, setAllowtIT] = useState(null);

    async function loadData() {
        try {
            let urlAPI = `http://localhost:8080/crm/getcrm/${id}`;
            let response = await fetch(urlAPI);
            let json = await response.json();
            setCRM(json.crm);
            setCRMVersions(json.versoes);
            setAllowtIT(json.allowIT);
            setCRMFiles(json.arquivos);
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
            await fetch(urlDecision, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            loadData();
        } catch (e) {
            console.log(e);
        }
    }

    async function setITDecision(data) {
        data.aprovado = CRMDecision;
        data.user = user.matricula;

        try {
            let urlDecision = `http://localhost:8080/approval/putitdecision/${id}`;
            await fetch(urlDecision, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            loadData();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (user) {
            loadData();
        } else {
            navigate('/');
        }
    }, [location.pathname]);

    return (
        <section className="crm-container">
            <h1 className="crm-title">Visualizar CRM</h1>


            <section className="crm-wrapper">
                <article className='crm-article'>
                    <h2 className='crm-article-title'>CRM</h2>
                    <CrmInfo subtitle='Nome da CRM' info={CRM.nome_crm} />
                    <div className='crm-article-flex'>
                        <CrmInfo subtitle='Número da CRM' info={CRM.numero_crm} />
                        <CrmInfo subtitle='Versão' info={CRM.versao} />
                    </div>
                    <div className='crm-article-flex'>
                        <CrmInfo subtitle='Data de criação' info={new Date(CRM.data_criacao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} />
                        <CrmInfo subtitle='Status' info={CRM.status_crm} />
                    </div>
                </article>

                <section className='crm-versions'>
                    <h2 className="crm-versions-title">Versões:</h2>
                    <div className='crm-versions-wrapper'>
                        {CRMVersions.map((crm) => (
                            <Link key={crm.id} to={`/crm/${crm.id}`} className={crm.id === Number(id) ? 'crm-versions-link active' : 'crm-versions-link'}>{crm.versao}</Link>
                        ))}
                    </div>
                </section>

                <article className='crm-article'>
                    <h2 className='crm-article-title'>Requerente</h2>
                    <CrmInfo subtitle='Setor' info={CRM.setor} />
                    <CrmInfo subtitle='Requerente' info={CRM.requerente} />
                    <CrmInfo subtitle='E-mail:' info={CRM.email} />
                </article>

                {CRM.necessidade || CRM.impacto ?
                    <article className='crm-article'>
                        <h2 className='crm-article-title'>Sobre</h2>
                        {CRM.necessidade ? <CrmInfo subtitle='A necessidade de:' info={CRM.necessidade} /> : null}
                        {CRM.impacto ? <CrmInfo subtitle='Impacto:' info={CRM.impacto} /> : null}
                    </article>

                    : null
                }

                <article className='crm-article'>
                    <h2 className='crm-article-title'>Informações</h2>
                    {CRM.descricao ? <CrmInfo subtitle='Descrição da demanda:' info={CRM.descricao} /> : null}
                    {CRM.objetivo ? <CrmInfo subtitle='Objetivo a ser atendido:' info={CRM.objetivo} /> : null}
                    {CRM.justificativa ? <CrmInfo subtitle='Justificativa:' info={CRM.justificativa} /> : null}
                    {CRM.alternativa ? <CrmInfo subtitle='Alternativas:' info={CRM.alternativa} /> : null}
                    {CRM.sistemas_envolvidos ? <CrmInfo subtitle='Sistemas envolvidos na mudança:' info={CRM.sistemas_envolvidos} /> : null}
                    {CRM.comportamento_offline ? <CrmInfo subtitle='Comportamento offline:' info={CRM.comportamento_offline} /> : null}
                    {CRM.dependencia ? <CrmInfo subtitle='Esta CRM depende de outro desenvolvimento?' info={CRM.dependencia} /> : null}
                </article>


                {CRM.complexidade || CRM.impacto_mudanca ?
                    <article className='crm-article'>
                        <h2 className='crm-article-title'>TI</h2>
                        {CRM.complexidade ? <CrmInfo subtitle='Complexidade da CRM:' info={CRM.complexidade} /> : null}
                        {CRM.impacto_mudanca ? <CrmInfo subtitle='Impacto da mudança' info={CRM.impacto_mudanca} /> : null}
                    </article>

                    : null
                }

                {CRMFiles.length > 0 ?
                    <article className="crm-article">
                        <h2 className="crm-article-title">Arquivos</h2>
                        {CRMFiles.map((file) => (
                            <div className='crm-article-file' key={file.id}>
                                {file.nome.split('.').pop() === 'docx' ? <AiFillFileWord className='crm-article-fileImage' /> : null}
                                {file.nome.split('.').pop() === 'pdf' ? <AiFillFilePdf className='crm-article-fileImage' /> : null}
                                {file.nome.split('.').pop() === 'ppt' ? <AiFillFilePpt className='crm-article-fileImage' /> : null}
                                {file.nome.split('.').pop() === 'png' ? <AiFillFileImage className='crm-article-fileImage' /> : null}
                                {file.nome.split('.').pop() === 'jpg' ? <AiOutlineFileJpg className='crm-article-fileImage' /> : null}
                                {file.nome.split('.').pop() === 'text' ? <AiFillFileText className='crm-article-fileImage' /> : null}
                                <a className="crm-article-fileName" href={file.fileURL} type={file.mimetype} download={file.nome}>{file.nome}</a>
                            </div>
                        ))}
                    </article>

                    : null
                }

                <article className="crm-article crm-article-aware">
                    <h2 className="crm-article-title">Setores envolvidos</h2>
                    <div className="crm-aware-list">
                        {Departments.map((d) => (
                            <div className="crm-aware-item" key={d.id_aprovacao}>
                                <div className='crm-aware-wrapper'>

                                    <p className="crm-aware-department">{d.setor}</p>
                                    {d.decisao === 'Pendente' ? <AiFillClockCircle className='crm-aware-img aware-pending' /> : null}
                                    {d.decisao === 'Aprovado' ? <AiFillCheckCircle className='crm-aware-img aware-accepted' /> : null}
                                    {d.decisao === 'Rejeitado' ? <AiFillCloseCircle className='crm-aware-img aware-rejected' /> : null}

                                    {d.responsavel ?
                                        <>
                                            <p className="crm-aware-user">{d.responsavel}</p>
                                            {d.comentario ? <p className="crm-aware-comment">{d.comentario}</p> : null}
                                        </>

                                        : null
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            {CRM.requerente_matricula === user.matricula && CRM.status_crm !== 'Aprovado' ?
                <section className='crm-edit'>
                    <Link to={`/editcrm/${id}`} className='crm-edit-button'>Editar CRM</Link>
                </section>

                : null
            }

            {AllowIT === true && CRM.requerente_matricula !== user.matricula && user.setor === 1 ?
                <section className='crm-decision'>
                    <form className='crm-decision-form' onSubmit={handleSubmit((data) => (setITDecision(data), reset()))}>
                        <h2 className="crm-decision-title">Dados TI</h2>

                        <p className='complexity-title'>Complexidade</p>
                        <div className='crm-decision-complexity'>
                            <div className='crm-decision-radio-wrapper'>
                                <input type="radio" id="radio-verylow" value='Muito baixa' {...register('complexidade')} />
                                <label htmlFor="radio-verylow">Muito baixa</label>
                            </div>
                            <div className='crm-decision-radio-wrapper'>
                                <input type="radio" id="radio-low" value='Baixa' {...register('complexidade')} />
                                <label htmlFor="radio-low">Baixa</label>
                            </div>
                            <div className='crm-decision-radio-wrapper'>
                                <input type="radio" id="radio-medium" value='Média' {...register('complexidade')} />
                                <label htmlFor="radio-medium">Média</label>
                            </div>
                            <div className='crm-decision-radio-wrapper'>
                                <input type="radio" id="radio-high" value='Alta' {...register('complexidade')} />
                                <label htmlFor="radio-high">Alta</label>
                            </div>
                        </div>

                        <label htmlFor="impacto">Impacto:</label>
                        <textarea id="impacto" {...register('impacto')} placeholder="Informe o impacto da mudança"></textarea>

                        <h2 className="crm-decision-title">Aprovação</h2>

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

                        <label htmlFor="comentario">Comentário:</label>
                        <textarea id="comentario" {...register('comentario')} placeholder="Adicione um comentário"></textarea>

                        <button type="submit" className="crm-decision-submit">Enviar decisão</button>
                    </form>
                </section>

                : null
            }

            {AllowIT === false && user.setor !== 1 && (Departments.find(d => d.decisao === 'Pendente' && d.cod_setor === user.setor)) !== undefined ?
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