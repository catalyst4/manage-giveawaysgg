import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { TextField } from '../components/TextField'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'
import { useRouter } from 'next/router'

const loginPage = () => {

    const router = useRouter()

    const [usernameOrEmail, setUsernameOrEmail] = useState<string>(undefined)
    const [password, setPassword] = useState<string>(undefined)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [submit, setSubmit] = useState<boolean>(false)

    const dispatch = useDispatch()
    
    const loginHandler = () => {
        setSubmit(true)
        dispatch(login({ usernameOrEmail, password }))
    }

    const { user } = useSelector((state: RootStateOrAny) => state.user)

    if(user) {
        router.push('/')
    }

    useEffect(() => {
        (usernameOrEmail && password) ? setDisabled(false) : setDisabled(true)
    }, [usernameOrEmail, password])

    return (
        <>
        <Head>
            <title>Login | Giveaways GG</title>
        </Head>
        <div className="w-full h-full bg-purple-600 flex justify-center items-center">
            <div className="w-80 bg-white text-black text-center p-5 rounded-xl">
                <h1 className="text-2xl font-bold mb-3">Log in</h1>
                <TextField 
                    value={usernameOrEmail}
                    placeholder="Username or Email"
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                />
                <TextField 
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    password
                />
                <button
                    onClick={loginHandler}
                    disabled={disabled ? true : false}
                    className={`${disabled && 'opacity-30 cursor-not-allowed'} transition w-full bg-purple-100 text-purple-800 p-2 rounded-md font-semibold text-sm focus:outline-none`}
                >
                    Log In
                </button>
            </div> 
        </div>
        </>
    )
}

export default loginPage
