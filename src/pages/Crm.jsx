import CrmInfo from '../components/CrmInfo';
import {AiFillFilePdf, AiFillFileWord} from 'react-icons/ai';
import './styles/Crm.css';

const Crm = () => {
    return (
        <section className="crm-container">
            <h1 className="crm-title">Visualizar CRM</h1>

            <section className="crm-wrapper">
                <article className='crm-article'>
                    <h2 className='crm-article-title'>CRM</h2>
                    <CrmInfo subtitle='Nome da CRM' info='Melhoria tal'/>
                    <CrmInfo subtitle='Número da CRM' info='8020'/>
                    <CrmInfo subtitle='Versão' info='5'/>
                    <CrmInfo subtitle='Data de criação' info='10 / 10 / 2022'/>
                    <CrmInfo subtitle='Requerente' info='Henrique Contini'/>
                    <CrmInfo subtitle='Setor' info='Mercantil'/>
                    <CrmInfo subtitle='Telefone ou ramal' info='19 9 99991234'/>
                    <CrmInfo subtitle='E-mail:' info='henrique@gmail.com'/>
                </article>
                <article className='crm-article'>
                    <h2 className='crm-article-title'>Sobre</h2>
                    <CrmInfo subtitle='A necessidade de:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                    <CrmInfo subtitle='Impacto:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                </article>
                <article className='crm-article'>
                    <h2 className='crm-article-title'>Informações</h2>
                    <CrmInfo subtitle='Descrição da demanda:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                    <CrmInfo subtitle='Objetivo a ser atendido:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                    <CrmInfo subtitle='Justificativa:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                    <CrmInfo subtitle='Alternativas:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                    <CrmInfo subtitle='Sistemas envolvidos na mudança:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                    <CrmInfo subtitle='Comportamento offline:' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
                    <CrmInfo subtitle='Esta CRM depende de outro desenvolvimento?' info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quod quibusdam illum, qui iure dolores consectetur rerum blanditiis beatae officia nam, necessitatibus ullam eaque reiciendis corporis ad quas nemo repellat!'/>
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
                    {/* Criar tabela - Setor | Nome do colaborador | Decisão */}
                </article>
            </section>
        </section>
    )
}

export default Crm;