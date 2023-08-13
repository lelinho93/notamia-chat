import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function PrivateRoutes({children}) {

    const [user] = useAuthState(auth)
        
    return user ? children : <Navigate to='/login' />
    
}