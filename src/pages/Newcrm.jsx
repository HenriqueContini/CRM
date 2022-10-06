import { useForm } from 'react-hook-form';

import './Newcrm.css';

const Newcrm = () => {
    const {register, handleSubmit} = useForm();

    return (
        <section className='newcrm-container'>
            <h1 className='newcrm-title'>Crie uma nova CRM</h1>

            <form className='newcrm-form' onSubmit={handleSubmit((data) => console.log(data))}>
                <fieldset className='newcrm-fieldset'>
                    <legend className='newcrm-legend'>Requerente</legend>

                    <div className="newcrm-fieldset-wrapper">
                        <label htmlFor="nome_crm">Nome da CRM</label>
                        <input id='nome_crm' type="text" {...register('nome_crm')} placeholder="Nome da CRM"/>
                        <label htmlFor="tel_crm">Telefone ou Ramal</label>
                        <input id='tel_crm' type="tel" {...register('tel_crm')} placeholder="Telefone para contato"/>
                        <label htmlFor="email_crm">E-mail</label>
                        <input id='email_crm' type="email" {...register('email_crm')} placeholder="E-mail para contato"/>
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

                    <div className="newcrm-fieldset-wrapper">
                        <label htmlFor="arquivos">Arquivos</label>
                        <input id="arquivos" type="file" {...register('arquivos')}/>
                    </div>
                </fieldset>
                <input className='newcrm-button' type="submit" />
            </form>
        </section>
    );
}

export default Newcrm;