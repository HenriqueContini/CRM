import { useForm } from 'react-hook-form';
import './styles/Profile.css';

const Profile = () => {
    const {register, handleSubmit} = useForm();

    return (
        <section className='profile-container'>
            <h1 className='profile-title'>Perfil</h1>
            <h2 className='profile-name'>Henrique Contini</h2>
            <form className='profile-form'>
                <label htmlFor="profile-email">E-mail:</label>
                <input id='profile-email' type="email" {...register('profile-email')} placeholder="E-mail" defaultValue={'henrique@gmail.com'}/>
                <label htmlFor="profile-tel">Telefone:</label>
                <input id='profile-tel' type="tel" {...register('profile-tel')} placeholder="Telefone" defaultValue={'19 9 12345678'}/>
                <label htmlFor="profile-password">Senha:</label>
                <input id='profile-password' type="password" {...register('profile-password')} placeholder="Senha"/>

                <button type="submit" className='profile-button'>Salvar</button>
            </form>
        </section>
    );
}

export default Profile;