import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BiCheckboxChecked, BiCheckbox } from 'react-icons/bi';

import './styles/Editcrm.css';

const Editcrm = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const [Files, setFiles] = useState([]);
    const [ListDepartments, setListDepartments] = useState([]);
    const [Departments, setDepartments] = useState([]);
    const [CRM, setCRM] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    async function loadData() {
        try {
            let urlAPI = `http://localhost:8080/crm/getcrm/${id}`;
            let response = await fetch(urlAPI);
            let json = await response.json();
            setCRM(json.crm);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();
        const departmentURL = `http://localhost:8080/department/list-departments/${user.setor}`;
        fetch(departmentURL)
            .then(r => r.json())
            .then(json => setListDepartments(json))
    }, [])

    const handleFiles = (newFile) => {
        setFiles([...Files, newFile]);
    }

    const handleDepartments = (newDepartment) => {
        let indexNewDepartment = Departments.indexOf(newDepartment);

        if (indexNewDepartment === -1) {
            setDepartments([...Departments, newDepartment]);
        } else {
            setDepartments(Departments.filter(i => i !== newDepartment));
        }
    }

    function editCRM(data) {
        const editURL = `http://localhost:8080/crm/editcrm/${id}`;
        CRM.setores = JSON.stringify(Departments);

        delete data.arquivos;

        fetch(editURL, {
            method: 'POST',
            body: JSON.stringify(CRM),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        navigate('/home')
    }

    const updateData = e => {
        const fieldName = e.target.name
        setCRM(existingValues => ({
            ...existingValues,
            [fieldName]: e.target.value,
        }))
    }

    return (
        <section className='editcrm-container'>
            <h1 className='editcrm-title'>Crie uma nova CRM</h1>

            <form className='editcrm-form' onSubmit={handleSubmit((d) => (editCRM(d), reset()))}>
                <fieldset className='editcrm-fieldset'>
                    <legend className='editcrm-legend'>CRM</legend>

                    <div className="editcrm-fieldset-wrapper">
                        <label htmlFor="nome_crm">CRM</label>
                        <input id='nome_crm' type="text" {...register('nome_crm')} placeholder="Nome da CRM" defaultValue={CRM.nome_crm} onChange={updateData} />
                    </div>
                </fieldset>

                <fieldset className='editcrm-fieldset'>
                    <legend className='editcrm-legend'>Sobre</legend>

                    <div className="editcrm-fieldset-wrapper">
                        <label htmlFor="necessidade">A necessidade de</label>
                        <textarea id="necessidade" {...register('necessidade')} placeholder="Descreva a necessidade" defaultValue={CRM.necessidade} onChange={updateData}></textarea>
                        <label htmlFor="impacto">Cujo impacto é?</label>
                        <textarea id="impacto" {...register('impacto')} placeholder="Qual é o impacto da demanda?" defaultValue={CRM.impacto} onChange={updateData}></textarea>
                    </div>
                </fieldset>

                <fieldset className='editcrm-fieldset'>
                    <legend className='editcrm-legend'>Informações</legend>

                    <div className="editcrm-fieldset-wrapper">
                        <label htmlFor="descricao">Descrição da demanda</label>
                        <textarea id="descricao" {...register('descricao')} placeholder="Descreva em detalhes a demanda a ser atendida" defaultValue={CRM.descricao} onChange={updateData}></textarea>
                        <label htmlFor="objetivo">Objetivo a ser atendido</label>
                        <textarea id="objetivo" {...register('objetivo')} placeholder="Documentar os objetivos de forma SMART" defaultValue={CRM.objetivo} onChange={updateData}></textarea>
                        <label htmlFor="justificativa">Justificativa</label>
                        <textarea id="justificativa" {...register('justificativa')} placeholder="Justificar o motivo pelo qual a mudança proposta precisa ser implementada" defaultValue={CRM.justificativa} onChange={updateData}></textarea>
                        <label htmlFor="alternativa">Alternativas</label>
                        <textarea id="alternativa" {...register('alternativa')} placeholder="Descrever, caso existam, alternativas à modificação proposta" defaultValue={CRM.alternativa} onChange={updateData}></textarea>
                        <label htmlFor="sistemas">Sistemas envolvidos na mudança</label>
                        <textarea id="sistemas" {...register('sistemas')} placeholder="Quais sistemas estão envolvidos na mudança?" defaultValue={CRM.sistemas_envolvidos} onChange={updateData}></textarea>

                        {user.setor === 8 ?
                            <>
                                <label htmlFor="offline">Comportamento offline</label>
                                <textarea id="offline" {...register('offline')} placeholder="Descreva o comportamento dessa mudança quando a Loja estiver offline" defaultValue={CRM.comportamento_offline} onChange={updateData}></textarea>
                            </>

                            : null
                        }

                        <label htmlFor="dependencia">Esta CRM depende de outro desenvolvimento?</label>
                        <textarea id="dependencia" {...register('dependencia')} placeholder="Informar SIM ou NÃO. Caso dependa, informar o nome do projeto necessário" defaultValue={CRM.dependencia} onChange={updateData}></textarea>
                    </div>
                </fieldset>

                <fieldset className='editcrm-fieldset'>
                    <legend className='editcrm-legend'>Arquivos</legend>

                    <div className="editcrm-fieldset-files">
                        <p className='files-p'>Escolha um arquivo:</p>
                        <label htmlFor="arquivos" className='files-label'>Arquivo</label>
                        <input id="arquivos" type="file" className='files-input' {...register('arquivos')} onChange={(e) => handleFiles(e.target.files[0].name)} />
                    </div>
                    {
                        Files.length > 0 && <div className='files-list'> {Files.map((file) => <p key={file} className="files-list-item">{file}</p>)}</div>
                    }
                </fieldset>

                <fieldset className='editcrm-fieldset'>
                    <legend className='editcrm-legend'>Setores envolvidos</legend>

                    <div className="editcrm-fieldset-department">
                        {ListDepartments.map((department) => (
                            <div className='department-option selected' key={department.cod_setor}
                                onClick={(() => handleDepartments(department.cod_setor))}>

                                <p>{department.nome}</p>
                                {Departments.includes(department.cod_setor) ? <BiCheckboxChecked /> : <BiCheckbox />}
                            </div>
                        ))}
                    </div>
                </fieldset>
                <input className='editcrm-button' type="submit" />
            </form>
        </section>
    );
}

export default Editcrm;