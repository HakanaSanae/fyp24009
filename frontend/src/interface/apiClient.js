import axios from 'axios';

class apiClient {
    constructor() {
       this.backendPath = 'http://fyp-laravel-server2-env.eba-3gaqk4pn.ap-northeast-3.elasticbeanstalk.com/api'; 
    }

    async login(formData) {
        const response = await axios.post(`${this.backendPath}/login`, formData); 
        const data = this.#datacheck(response); 
        if (data) {
            return data; 
        } else {
            throw new Error('Login failed');
        }
    }

    async register(formData) {
        const response = await axios.post(`${this.backendPath}/register`, formData); 
        const data = this.#datacheck(response); 
        if (data) {
            return data; 
        } else {
            throw new Error('Register failed');
        }
    }

    async logout() {
        const response = await axios.get(`${this.backendPath}/logout`); 
        const data = this.#datacheck(response)
        if (data) {
            return data; 
        } else {
            throw new Error('Logout failed');
        }
    }

    //private methods 
    #datacheck(response){
        if (response.status == 200) {
            return response.data;  
        } else {
            return null; 
        }
    }
}

export default new apiClient();