import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'
import { app } from '../../services/firebase'

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const login = () => {
    const { email, password } = user
    const auth = getAuth(app)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        // IT WAS NOT NECESSARY TO SET TOKEN IN LOCAL STORAGE BECAUSE THE AUTENTICATION IS IN FIREBASE
        // const token = userCredential;
        // localStorage.setItem('token', JSON.stringify(token))
        navigate('/home')

      })
      .catch((error) => {
        alert('An error ocurred, try again.')
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  
  return (
    <>
      <div className="container">
        <div >
          <h1 className='title'>Notami Chat Login</h1>
        </div>
        <div>
          <label className='label-email'>
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
          <div className="flex items-center justify-between">
            <label className="label-password">
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
            onClick={login}
          >
            Sign in
          </button>
        </div>

        <p className="register-text">
          Not a member?{' '}
          <Link className='link' to="/">Register here</Link>
        </p>
      </div>

    </>
  )
}