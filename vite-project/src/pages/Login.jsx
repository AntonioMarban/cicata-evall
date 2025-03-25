import CICATA from '../assets/cicatalogo.png'
import LOGOEVAL from '../assets/evallLogo.png'
import '../styles/login.css'

import { useNavigate  } from 'react-router-dom'

const  Login = () => {
    const navigate = useNavigate();

    const formSubmit = async (evt) => {
        evt.preventDefault()
        navigate('/Inicio')
    };
        return (
            <form onSubmit={formSubmit} className='login-form'>
                <div>
                    <img alt='imagen-cicata' className='image-cicata' src={CICATA}></img>
                    <input autoFocus type='text' name='email' placeholder='email'></input>
                    <input type='password' name='password' placeholder='password'></input>
                    <button type='submit'>Login</button>
                </div>
                <img alt='imagen-eval' className='image-evall' src={LOGOEVAL}></img>
            </form>
    )
}

export default Login;