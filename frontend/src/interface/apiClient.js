import axios from 'axios';

class apiClient {
    
    constructor() {
        this.testing = true; 
        this.backendPath = this.testing ? 'http://localhost:8000/api' : 'http://fyp-laravel-server2-env.eba-3gaqk4pn.ap-northeast-3.elasticbeanstalk.com/api'; 
        // axios.defaults.withCredentials = true; 
    }

    async login(formData) {
        try {
            const response = await axios.post(`${this.backendPath}/login`, formData); 
            return response.data;
        } catch (error) {
            return this.handleError(error.response, 'Login failed'); 
        }
    }

    async register(formData) {
        try{
            const response = await axios.post(`${this.backendPath}/register`, formData); 
            return response.data;
        } catch (error) {
            return this.handleError(error.response, 'Register failed'); 
        }
    }

    async logout() {
        try{
            const response = await axios.get(`${this.backendPath}/logout`); 
            return response.data;
        } catch (error) {
            return this.handleError(error.response, 'Logout failed'); 
        }
    }

    async submitRiskAnalysisFile(formData) {
        try {
            const response = await axios.post(`${this.backendPath}/risk-analysis`, formData); 
            return response.data;
        } catch (error) {
            return this.handleError(error.response, 'File upload failed'); 
        }
    }

    async fetchUserInfo() {
        try{
            const response = await axios.get(`${this.backendPath}/user-info`); 
            return response.data; 
        } catch (error) {
            return this.handleError(error.response, 'Fetch user info failed'); 
        }
    }

    async updateUserInfo(formData) {
        try{
            const response = await axios.put(`${this.backendPath}/update-user-info`, formData); 
            return response.data;
        } catch (error) {
            return this.handleError(error.response, 'Update user info failed'); 
        }
    }

    //private methods 
    handleError(response, error = 'Internal Server Error'){
        if (!response) {
            throw new Error('Network error, please check your connection');
        }

        if ( response.status == 401 ) {
            window.location.href = '/login';
            throw new Error('Unauthorized access, please login again');
        } else {
            throw new Error(error); 
        }
    }
}

export default new apiClient();