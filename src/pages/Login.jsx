import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import "./styles/Login.css";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const saveUser = (data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        navigate('/home');
    }

    return (
        <main className='main-login'>
            <section className="login-container">
                <img src="logo-crm.png" alt="Logo CRM" className='login-logo' />

                <form className='login-form' onSubmit={handleSubmit((data) => saveUser(data))}>
                    <label htmlFor="login_matricula">Matrícula</label>
                    <input className='login-form-input' id='login_matricula' type="number" {...register('login_matricula')} placeholder="Insira a matrícula" />
                    <label htmlFor="login_senha">Senha</label>
                    <input className='login-form-input' id='login_senha' type="password" {...register('login_senha')} placeholder="Senha" />

                    <button type='submit' className='login-button'>Fazer login</button>
                </form>
            </section>
        </main>
    );
}

export default Login;