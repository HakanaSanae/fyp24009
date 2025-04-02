import axios from 'axios';

class apiClient {
    constructor() {
       this.backendPath = 'http://fyp-laravel-server2-env.eba-3gaqk4pn.ap-northeast-3.elasticbeanstalk.com/api'; 
    }

    async login(formData) {
        const response = await axios.post(`${this.backendPath}/login`, formData); 
        return this.datacheck(response, 'Login failed'); 
        
    }

    async register(formData) {
        const response = await axios.post(`${this.backendPath}/register`, formData); 
        return this.datacheck(response, 'Register failed'); 
    }

    async logout() {
        const response = await axios.get(`${this.backendPath}/logout`); 
        return this.datacheck(response, 'Logout failed')
       
    }

    async submitRiskAnalysisFile(formData) {
        const response = await axios.post(`${this.backendPath}/risk-analysis`, formData); 
        return this.datacheck(response, 'File upload failed');
    }

    //private methods 
    datacheck(response, error = 'Internal Server Error'){
        if (response.status == 200) {
            return response.data;  
        } else {
            throw new Error(error); 
        }
    }
}

export default new apiClient();