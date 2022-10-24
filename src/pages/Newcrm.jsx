import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './styles/Newcrm.css';

const Newcrm = () => {
    const urlAPI = 'http://localhost:8080/crm/create-crm';
    const { register, handleSubmit, reset } = useForm();
    const [Files, setFiles] = useState([]);
    let user = JSON.parse(sessionStorage.getItem('user'));

    // const [Department, setDepartment] = useState([]);

    const handleFiles = (newFile) => {
        setFiles([...Files, newFile]);
    }

    // const handleDepartment = (newDepartment) => {
    //     setDepartment([...Department, newDepartment]);
    // }

    function createCRM(data) {
        data.user = user.matricula;
        delete data.arquivos;

        fetch(urlAPI, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const departmentOptions = ['Mercantil', 'Controladoria', 'Fiscal']

    return (
        <section className='newcrm-container'>
            <h1 className='newcrm-title'>Crie uma nova CRM</h1>

            <form className='newcrm-form' onSubmit={handleSubmit((data) => (createCRM(data), reset()))}>
                <fieldset className='newcrm-fieldset'>
                    <legend className='newcrm-legend'>CRM</legend>

                    <div className="newcrm-fieldset-wrapper">
                        <label htmlFor="nome_crm">CRM</label>
                        <input id='nome_crm' type="text" {...register('nome_crm')} placeholder="Nome da CRM" />
                    </div>
                </fieldset>

                <fieldset className='newcrm-fieldset'>
                    <legend className='newcrm-legend'>Sobre</legend>

                    <div className="newcrm-fieldset-wrapper">
                        <label htmlFor="necessidade">A necessidade de</label>
                        <textarea id="necessidade" {...register('necessidade')} placeholder="Descreva a necessidade"></textarea>
                        <label htmlFor="impacto">Cujo impacto é?</label>
                        <textarea id="impacto" {...register('impacto')} placeholder="Qual é o impacto da demanda?"></textarea>
                    </div>
                </fieldset>

                <fieldset className='newcrm-fieldset'>
                    <legend className='newcrm-legend'>Informações</legend>

                    <div className="newcrm-fieldset-wrapper">
                        <label htmlFor="descricao">Descrição da demanda</label>
                        <textarea id="descricao" {...register('descricao')} placeholder="Descreva em detalhes a demanda a ser atendida"></textarea>
                        <label htmlFor="objetivo">Objetivo a ser atendido</label>
                        <textarea id="objetivo" {...register('objetivo')} placeholder="Documentar os objetivos de forma SMART"></textarea>
                        <label htmlFor="justificativa">Justificativa</label>
                        <textarea id="justificativa" {...register('justificativa')} placeholder="Justificar o motivo pelo qual a mudança proposta precisa ser implementada"></textarea>
                        <label htmlFor="alternativa">Alternativas</label>
                        <textarea id="alternativa" {...register('alternativa')} placeholder="Descrever, caso existam, alternativas à modificação proposta"></textarea>
                        <label htmlFor="sistemas">Sistemas envolvidos na mudança</label>
                        <textarea id="sistemas" {...register('sistemas')} placeholder="Quais sistemas estão envolvidos na mudança?"></textarea>
                        <label htmlFor="offline">Comportanmento offline (Somente para o mercantil)</label>
                        <textarea id="offline" {...register('offline')} placeholder="Descreva o comportamento dessa mudança quando a Loja estiver offline"></textarea>
                        <label htmlFor="dependencia">Esta CRM depende de outro desenvolvimento?</label>
                        <textarea id="dependencia" {...register('dependencia')} placeholder="Informar SIM ou NÃO. Caso dependa, informar o nome do projeto necessário"></textarea>
                    </div>
                </fieldset>

                <fieldset className='newcrm-fieldset'>
                    <legend className='newcrm-legend'>Arquivos</legend>

                    <div className="newcrm-fieldset-files">
                        <p className='files-p'>Escolha um arquivo:</p>
                        <label htmlFor="arquivos" className='files-label'>Arquivo</label>
                        <input id="arquivos" type="file" className='files-input' {...register('arquivos')} onChange={(e) => handleFiles(e.target.files[0].name)} />
                    </div>
                    {
                        Files.length > 0 && <div className='files-list'> {Files.map((file) => <p key={file} className="files-list-item">{file}</p>)}</div>
                    }
                </fieldset>

                {/* <fieldset className='newcrm-fieldset'>
                    <legend className='newcrm-legend'>Setores envolvidos</legend>

                    <div className="newcrm-fieldset-department">
                        <label htmlFor="setores_envolvidos">Escolha um setor:</label>
                        <select {...register('setores_envolvidos')} className="department-select">
                            {departmentOptions.map(value => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset> */}
                <input className='newcrm-button' type="submit" />
            </form>
        </section>
    );
}

export default Newcrm;