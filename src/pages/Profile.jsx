import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styles/Profile.css';

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const {register, handleSubmit} = useForm();
    const [UserData, setUserData] = useState({})

    async function loadData() {
        try {
            const userAPI = `http://localhost:8080/user/getuser/${user.matricula}`;
            const response = await fetch(userAPI, {
                method: 'GET'
            });
            let json = await response.json();
            setUserData(json);
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
        <section className='profile-container'>
            <h1 className='profile-title'>Perfil</h1>
            <h2 className='profile-name'>{UserData.nome}</h2>
            <h3 className='profile-deparment'>{UserData.setor}</h3>
            <form className='profile-form'>
                <label htmlFor="profile-email">E-mail:</label>
                <input id='profile-email' type="email" {...register('profile-email')} placeholder="E-mail" defaultValue={UserData.email}/>
                {/* <label htmlFor="profile-tel">Telefone:</label>
                <input id='profile-tel' type="tel" {...register('profile-tel')} placeholder="Telefone" defaultValue={'19 9 12345678'}/> */}
                <label htmlFor="profile-password">Senha:</label>
                <input id='profile-password' type="password" {...register('profile-password')} placeholder="Senha"/>

                <button type="submit" className='profile-button'>Salvar</button>
            </form>
        </section>
    );
}

export default Profile;