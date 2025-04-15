import axios from 'axios';

const testing = true; 
const backendPath = testing ? 'http://localhost:8000/api' : 'http://fyp-laravel-server2-env.eba-3gaqk4pn.ap-northeast-3.elasticbeanstalk.com/api'; 
axios.defaults.withCredentials = true; 

const handleError = (response, navigate, error = 'Internal Server Error') =>{
    
    if (!response) {
        throw new Error('Network error, please check your connection');
    }

    if ( response.status == 401 ) {
        localStorage.removeItem('account');
        navigate('/login');
        throw new Error('Unauthorized access, please login again');
    } else {
        throw new Error(error); 
    }
}

const getMe = async (navigate) => {
    try {
        const response = await axios.get(`${backendPath}/me`); 
        if (response.status !== 200) {
            localStorage.removeItem('account');
            navigate('/login');
            throw new Error('Failed to fetch user info'); 
        }

        console.log(response.data);

        if (!response.data.success) {
            localStorage.removeItem('account');
            navigate('/login');
            throw new Error(response.data.message); 
        } else {
            if (localStorage.getItem('account') !== response.data.message.user_info.name) {
                localStorage.setItem('account');
            }
        }
    } catch (error) {
        throw new Error(error); 
    }
}

export const login = async (formData, navigate) => {
    try {
        const response = await axios.post(`${backendPath}/login`, formData); 
        return response.data;
    } catch (error) {
        return handleError(error.response, navigate, 'Login failed'); 
    }
}

export const register = async (formData, navigate) => {
    try{
        const response = await axios.post(`${backendPath}/register`, formData); 
        return response.data;
    } catch (error) {
        return handleError(error.response, navigate, 'Register failed'); 
    }
}


export const logout = async (navigate) => {
    try{
        const response = await axios.get(`${backendPath}/logout`); 
        return response.data;
    } catch (error) {
        return handleError(error.response, navigate, 'Logout failed'); 
    }
}

export const submitPerformanceAnalysisFile = async (formData, navigate) => {
    try {
        await getMe(navigate); 
        const response = await axios.post(`${backendPath}/performance-analysis`, formData); 
        return response.data;
    } catch (error) {
        return handleError(error.response, navigate, 'File upload failed'); 
    }
}

export const fetchUserInfo = async (navigate) => {
    try{
        await getMe(navigate); 
        const response = await axios.get(`${backendPath}/user-info`); 
        return response.data; 
    } catch (error) {
        return handleError(error.response, navigate, 'Fetch user info failed'); 
    }
}

export const updateUserInfo = async (formData, navigate) => {
    try{
        await getMe(navigate); 
        const response = await axios.put(`${backendPath}/update-user-info`, formData); 
        return response.data;
    } catch (error) {
        return handleError(error.response, navigate, 'Update user info failed'); 
    }
}