import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'

export default function Register() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    
    const createUserLocal = () => {
        
        const auth = getAuth()
        
        const { email, password } = user
        
        createUserWithEmailAndPassword(auth, email, password)

        .then(() => {
  
            alert('Registered with success!')
            navigate('/login')
          })

        .catch((error) => {

            alert('An error have occurred, try again.')
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
          })

    }

    return (
        <>
            <div className="container">
                <div >
                    <h1 className='title'>Notami Register</h1>
                </div>
                <div className="">

                    <div>
                        <label className='label'>
                            Name
                        </label>
                        <div className="input-wrapper">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className=""
                            />
                        </div>
                    </div>
                    <div>
                        <label className='label'>
                            Email address
                        </label>
                        <div className="input-wrapper">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className=""
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="">
                            <label className="label">
                                Password
                            </label>
                            <div className="text-sm">
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className=""
                                value={user.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className='button-div'>
                        <button
                            type="submit"
                            className=""
                            onClick={createUserLocal}
                        >
                            Sign in
                        </button>
                    </div>


                    <p className="register-text">
                        Already a member?{' '}
                        <Link className="link" to="/login">Sign in here</Link>

                    </p>
                </div>
            </div>
        </>
    )
}