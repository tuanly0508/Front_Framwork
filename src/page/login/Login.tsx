import { error } from 'console';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { userController } from '../../controllers/UserController';
import { User } from '../../model/User';
import './Login.css'

interface State {
    email: string
    pass: string
    show: Boolean
    repass: string
    y: number
    name: string
    user: User
    error: string
    errorRepass: string
    errorLogin: string
}

export default function Login() {
    const { changeUser, popupAdd } = useContext(UserContext)
    let navigate = useNavigate()
    const [state, setState] = useState<State>({
        email: '',
        pass: '',
        show: true,
        y: 0,
        repass: '',
        name: '',
        user: { address: '', email: '', name_user: '', phone: '', pass: '', id_order: '', id_user: '',role:'user' ,repass: ''},
        error: '',
        errorRepass: '',
        errorLogin: ''
    })

    const handleLogin = (e: any) => {
        e.preventDefault()
        userController.login(state.email, state.pass).then(res => {
            if (res.length >=0) {
                setState(prev => ({...prev,errorLogin: 'Email or password incorrect'}))
            }else {
                changeUser(res.data)
                let token = res.accessToken
                localStorage.setItem('accessToken', token)
                navigate('/')
            }
        })
    }

    const handleRegister = (e: any) => {
        e.preventDefault()
        if( state.user.pass === state.user.repass) {
            userController.create(state.user).then((res) => {
                if(res.length > 0) {
                    setState(prev => ({...prev,error: 'Email already exists'}))
                }else {
                    navigate('/login')
                    popupAdd('Register success !!!')
                }
            })
        }else {
            setState(prev => ({...prev,errorRepass: 'RePassword is incorrect'}))
        }
        
    }

    const register = () => {
        if (state.y === 0) {
            setState(prev => ({ ...prev, y: 1 }))
        } else {
            setState(prev => ({ ...prev, y: 0 }))
        }
    }

    const clearError = () => {
        setState(prev => ({...prev,error: '',errorRepass:'',errorLogin: ''}))
    }

    return (
        <section>
            <div className="parent clearfix" />
            <div className="bg-illustration">
                <img src="https://i.ibb.co/Pcg0Pk1/logo.png" alt="logo" />
                <div className="burger-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {state.y === 0 ?
                        <>
                            <h1>Login to Catchy Pet</h1>
                            <div className="login-form">
                                <form onSubmit={handleLogin}>
                                    <input onClick={clearError} required value={state.email} type="text" placeholder="E-mail Address" onChange={e => setState(prev => ({ ...prev, email: e.target.value }))} />
                                    
                                    <input onClick={clearError} required value={state.pass} type="password" placeholder="Password" onChange={e => setState(prev => ({ ...prev, pass: e.target.value }))} />
                                    {state.errorLogin !== '' ? <p style={{color:'red', fontSize:12,marginLeft: 5}} >{state.errorLogin}</p> : null }

                                    <div className='forget-pass-bg'>
                                        <div className="remember-form">
                                            <input type="checkbox" />
                                            <span>Remember me</span>
                                        </div>
                                        <div className="forget-pass">
                                            Forgot Password ?
                                        </div>
                                    </div>

                                    <div className='btn-login'>
                                        <button type="submit">LOG-IN</button>
                                    </div>
                                    <div className='btn-social'>
                                        <p onClick={register} >Create new account </p>
                                    </div>
                                </form>
                            </div>
                        </>
                        :
                        <>
                            <h1>Register to Catchy Pet</h1>
                            <div className="login-form">
                                <form onSubmit={handleRegister}>

                                    <input type="text" required placeholder="E-mail Address" onClick={clearError} onChange={e => setState(prev => ({ ...prev, user: { ...prev.user, email: e.target.value } }))} />
                                    {state.error !== '' ? <p style={{color:'red', fontSize:12,marginLeft: 5}} >{state.error}</p> : null }
                                    <input required type="text" placeholder="Full name" onChange={e => setState(prev => ({ ...prev, user: { ...prev.user, name_user: e.target.value } }))} />
                                    <input required type="password" placeholder="Password" onChange={e => setState(prev => ({ ...prev, user: { ...prev.user, pass: e.target.value } }))} />
                                    <input onClick={clearError} required type="password" placeholder="Re-Password" onChange={e => setState(prev => ({ ...prev, user: { ...prev.user, repass: e.target.value } }))} />
                                    {state.errorRepass !== '' ? <p style={{color:'red', fontSize:12,marginLeft: 5}} >{state.errorRepass}</p> : null }

                                    <div className='btn-login'>
                                        <button type="submit">Register</button>
                                    </div>
                                    <div className='btn-social'>
                                        <p onClick={register} >Back to login </p>
                                    </div>
                                </form>
                            </div>
                        </>
                    }

                </div>
            </div>
        </section>
    )
}
