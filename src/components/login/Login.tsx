import React, { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });

    const {login, logout} = useAuthContext();
    const navigate = useNavigate();

    const handleChange = (event:any) =>{
        const name = event.target.name;
        const value = event.target.value;
        setLoginData((prev) =>({
            ...prev,
            [name]:value
        }))
    }

    const sampleUserData = {
        email: "test@email.com",
        role: "ADMIN",
        firstName: "John",
        lastName: "Doe",
        accessToken: "accessToken_test",
        refreshToken: "refreshToken_test"
    }

    const handleSubmit = (event: any) =>{
        event.preventDefault();
        if (loginData.email ==="" || loginData.password === "" ){
            alert("Email and password cannot be empty")
            return;
        }

        login(sampleUserData);
        navigate("/secure/post/update");
        console.log("Current URL:", window.location.href);


    }

    return (
        <div>
            Login
            <form >
                <div>
                    <label htmlFor="user-email" >Email</label>
                    <input name= "email" type="text" value={loginData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="user-email" >Email</label>
                    <input name="password" type="text" value={loginData.password} onChange={handleChange} />
                </div>
                <button onClick={handleSubmit}>
                    Submit
                </button>
            </form>
            
        </div>
    )
}

export default Login