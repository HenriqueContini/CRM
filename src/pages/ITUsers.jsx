import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import "./styles/ITUsers.css";

const ITUsers = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const [ListDepartments, setListDepartments] = useState([]);
    const [Error, setError] = useState('');

    const createUser = async (data) => {
        const createUserURL = `http://localhost:8080/user/createuser/${user.matricula}`;

        console.log(data)

        const response = await fetch(createUserURL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (json.error === true) {
            setError(json.msg);
        } else {
            setError('');
        }
    }

    useEffect(() => {
        if (user) {
            const departmentURL = `http://localhost:8080/department/list-all-departments`;
            fetch(departmentURL)
                .then(r => r.json())
                .then(json => setListDepartments(json))
        } else {
            navigate('/');
        }
    }, []);

    return (
        <section className='itusers-container'>
            <h1 className='itusers-title'>Usuários</h1>
            <h2 className='itusers-subtitle'>Adicionar usuários</h2>

            <form className='itusers-form' onSubmit={handleSubmit((data) => (createUser(data), reset()))}>

                <label htmlFor="matricula">Matrícula:</label>
                <input id='matricula' type="number" {...register('matricula')} required placeholder="Matrícula do usuário" />
                <label htmlFor="nome">Nome:</label>
                <input id='nome' type="text" {...register('nome')} required placeholder="Nome do usuário" />
                <label htmlFor="email">E-mail:</label>
                <input id='email' type="email" {...register('email')} required placeholder="E-mail" />
                <label htmlFor="senha">Senha:</label>
                <input id='senha' type="password" {...register('senha')} required placeholder="Senha" />

                <div className="itusers-departments">
                    <h3 className="itusers-department-title">Setor do usuário</h3>
                    {ListDepartments.map((department) => (
                        <div className='itusers-deparment-option' key={department.cod_setor}>
                            <input type="radio" id={`department-${department.cod_setor}`} value={department.cod_setor} {...register('setor_usuario')} />
                            <label className='itusers-deparment-label' htmlFor={`department-${department.cod_setor}`}>{department.nome}</label>
                        </div>
                    ))}
                </div>

                {Error ? <p className='itusers-error'>{Error}</p> : null}

                <button type="submit" className='itusers-button'>Salvar</button>
            </form>
        </section>
    );
}

export default ITUsers;