import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styles/Profile.css';

const Profile = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { register, handleSubmit, reset } = useForm();
    const [UserData, setUserData] = useState({});

    async function loadData() {
        try {
            const getUserURL = `http://localhost:8080/user/getuser/${user.matricula}`;
            const response = await fetch(getUserURL, {
                method: 'GET'
            });
            let json = await response.json();
            setUserData(json);
        } catch (e) {
            console.log(e);
        }
    }

    const onSubmit = async (data) => {
        const updateURL = `http://localhost:8080/user/updateuser/${user.matricula}`;
        const formData = new FormData();

        formData.append("file", data.file[0]);

        delete data.file;

        for (let key in data) {
            formData.append(key, data[key]);
        }

        await fetch(updateURL, {
            method: "PUT",
            body: formData
        })

        loadData();
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

            {UserData.imagem_usuario ?
                <img className='profile-image' src={UserData.imagem_usuario} alt="Imagem de perfil" />

                : null
            }

            <form className='profile-form' onSubmit={handleSubmit((data) => (onSubmit(data), reset()))} encType="multipart/form-data">

                <label htmlFor="email">E-mail:</label>
                <input id='email' type="email" {...register('email')} placeholder="E-mail" defaultValue={UserData.email} />
                <label htmlFor="senha">Senha:</label>
                <input id='senha' type="password" {...register('senha')} placeholder="Senha" />

                <label htmlFor="image">Imagem perfil:</label>
                <input id='image' type="file" {...register('file')} />

                <button type="submit" className='profile-button'>Salvar</button>
            </form>
        </section>
    );
}

export default Profile;