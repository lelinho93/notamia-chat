import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { app } from "../firebase";

export function createUser(email, password){

const auth = getAuth(app);
  
createUserWithEmailAndPassword(auth, email, password)

  .then((userCredential) => {
  
    const token = userCredential.user;
    localStorage.setItem('token', JSON.stringify(token))
    console.log('Success', token)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  })}


  export function login(email, password) {
    const auth = getAuth(app)

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const token = userCredential.user;
    localStorage.setItem('token', JSON.stringify(token))
    return true
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
  }