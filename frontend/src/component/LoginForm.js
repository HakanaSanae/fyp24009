import React, {useState} from 'react';
import { login } from '../interface/apiClient';
import { useNavigate } from 'react-router-dom';

function LoginForm(){
    const navigate = useNavigate();
    const [errorMes, setErrorMes] = useState(null);

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
            const data = await login({
                email: formData.email,
                password: formData.password,
            }, navigate); 
            if (data.success) {
                localStorage.setItem('account', data.name);
                navigate('/dashboard');
            } else {
                setErrorMes("Email or Password incorrect. <br> Please try again."); 
            }
            
        } catch (error) {
            setErrorMes(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <input 
                        type="email" 
                        name="email" 
                        value = {formData.email}
                        onChange= {handleChange}
                        placeholder="Email"
                        required 
                    />
                </div>
                <div className="form-item">
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange} 
                        placeholder="Password"
                        required 
                    />
                </div>

                {
                    errorMes ? <div className="form-item">
                        <p className="error-message" style={{color: 'red'}} dangerouslySetInnerHTML={{ __html: errorMes }}/>
                    </div> : null
                }

                <div className="form-item">
                    <button type="submit">Login</button>
                </div>

                <p>
                    Don't have an account? Click <a href="/register">here</a> to register. 
                </p>
                
            </form>
            
            
        </>
    )
}

export default LoginForm;