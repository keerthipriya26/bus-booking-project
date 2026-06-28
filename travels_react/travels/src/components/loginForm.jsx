import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({onLogin}) => {
    const [form, setForm] = useState({
        username: '', password:""
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const [message, setMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/api/login/", form);
            setMessage('Login Successful')
            if(onLogin){
                onLogin(response.data.token, response.data.user_id)
            }
        } catch(error){
            setMessage(`Login Failed`)

        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>User Name</label>
                <input type="text" name="username" value={form.username} onChange={handleChange}/> <br/>
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange}/> <br/>
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default LoginForm