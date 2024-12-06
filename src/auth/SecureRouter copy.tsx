import React from "react";
import {Navigate} from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext"

type SecureRouterProps = {
    children:React.ReactNode;
    requiredRole?:string;
}

const SecureRouter: React.FC<SecureRouterProps> = (children, requiredRole) => {
    console.log("required role:",requiredRole)
    const {isAuthenticated, hasRole} = useAuthContext();
    
    if (!isAuthenticated){
        return <Navigate to ="/public/login"/>
    }

    if (requiredRole && !hasRole("ADMIN")){
        return <Navigate to="/unauthrized"/>
    }

    return  <>{children}</>
}

export default SecureRouter