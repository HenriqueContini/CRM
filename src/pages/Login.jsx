import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import "./styles/Login.css";

const Login = () => {
    const urlAPI = 'http://localhost:8080/user/login';
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    async function saveUser(data) {
        try {
            const response = await fetch(urlAPI, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (response.ok) {
                sessionStorage.setItem('user', JSON.stringify(json));
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className='main-login'>
            <section className="login-container">
                <img src="logo-crm.png" alt="Logo CRM" className='login-logo' />

                <form className='login-form' onSubmit={handleSubmit((data) => (saveUser(data), reset()))}>
                    <label htmlFor="matricula">Matrícula</label>
                    <input className='login-form-input' id='matricula' type="number" {...register('matricula')} placeholder="Insira a matrícula" />
                    <label htmlFor="senha">Senha</label>
                    <input className='login-form-input' id='senha' type="password" {...register('senha')} placeholder="Senha" />

                    <button type='submit' className='login-button'>Fazer login</button>
                </form>
            </section>
        </main>
    );
}

export default Login;