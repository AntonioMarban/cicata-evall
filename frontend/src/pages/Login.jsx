import CICATA from '../assets/cicatalogo.png'
import LOGOEVAL from '../assets/evallLogo.png'
import { useNavigate  } from 'react-router-dom'
import { useRef } from 'react'

const  Login = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const loginForm =   useRef(null);

    const handleOnLogin = async (evt) => {
        evt.preventDefault()
        const form = new FormData(loginForm.current);
        const dataForm = Object.fromEntries(form.entries());
        const reponse = await fetch(`${apiUrl}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForm)
            })
        const data = await reponse.json()
        if(data.token){
            navigate('/Inicio')
            localStorage.setItem('token',data.token)
        }else{
            alert('Usuario o contraseña incorrectos')
        }
        evt.preventDefault()
    };
        return (
            <form onSubmit={handleOnLogin} ref={loginForm} 
            className="bg-[url('../assets/background.png')] bg-cover bg-center h-screen w-screen flex flex-wrap justify-center items-center">
                <div  className='bg-white/60 w-1/2 flex flex-col items-center justify-center rounded-lg md:w-2/6'>
                    <img alt='imagen-cicata' className="w-4/5" src={CICATA}></img>
                    <input 
                    className="!p-2 bg-white/50 border-none mb-5 w-4/5 h-[12%] pl-5 text-2xl rounded-sm"
                    autoFocus type='text' name='email' placeholder='email'></input>
                    <input 
                    className="!p-2 !mt-5 bg-white/50 border-none mb-5 w-4/5 h-[12%] pl-5 text-2xl rounded-sm"
                    type='password' name='password' placeholder='password'></input>
                    <button type='submit'
                    className="!m-5 !p-2 bg-[#1591D1] w-2/5 h-[12%] border-none text-white cursor-pointer text-2xl rounded">Login</button>
                </div>
                <img alt='imagen-eval' className="!m-5 w-[10%] absolute bottom-0 right-0 md:w-[10%]" src={LOGOEVAL}></img>
            </form>
    )
}

export default Login;