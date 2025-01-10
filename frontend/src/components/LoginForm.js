import React, {useState} from 'react';
import axios from 'axios';

function LoginForm({setAccount}){

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', 
            {
                email: formData.email,
                password: formData.password,
            }); 
            const data = response.data; 
            if (data.success) {
                localStorage.setItem('account', data.name);
                setAccount(data.name);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value = {formData.email}
                    onChange= {handleChange}
                    required 
                />

                <label for="password">Password</label>
                <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange} 
                    required 
                />

                <button type="submit">Login</button>
            </form>
            
            <p>
                Don't have an account? Click <a href="/register">here</a> to register. 
            </p>
        </div>
    )
}

export default LoginForm;