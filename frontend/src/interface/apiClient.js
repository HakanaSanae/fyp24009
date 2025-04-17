import axios from 'axios';
import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import { crc32 } from 'crc';

const testing = true; 
const backendPath = testing ? 'http://localhost:8000/api' : 'https://dhzk7e8q9584c.cloudfront.net/api'; 
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
    const file = formData.get('file');
    console.log('file get'); 
    const fileName = `${Date.now()}-${file.name}`;
    console.log('filename get'); 

    const credentials = {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    };

    const s3Client = new S3Client({
        region: process.env.REACT_APP_S3_REGION,
        credentials: credentials,
    });

    console.log(process.env.REACT_APP_S3_REGION)

    try {
        // await getMe(navigate);
        const partSize = 5 * 1024 * 1024; 
        const numParts = Math.ceil(file.size / partSize);
        const promises = [];

        const filePath = `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_S3_REGION}.amazonaws.com/${fileName}`;
        const formDataToSend = new FormData();
        formDataToSend.append(
            'file_path',
            filePath
        );

        const createMultipartUploadResponse = await s3Client.send(new CreateMultipartUploadCommand({
            Bucket: process.env.REACT_APP_S3_BUCKET,
            Key: fileName,
            ContentType: file.type,
        }));

        const uploadId = createMultipartUploadResponse.UploadId;

        for (let partNumber = 1; partNumber <= numParts; partNumber++) {
            const start = (partNumber - 1) * partSize;
            const end = Math.min(start + partSize, file.size);
            const part = file.slice(start, end);

            const arrayBuffer = await part.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const checksumHex = crc32(uint8Array).toString(16);
            const checksumBinary = new Uint8Array(
                checksumHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
            );
            const checksumBase64 = btoa(String.fromCharCode(...checksumBinary));

            promises.push(
                s3Client.send(new UploadPartCommand({
                    Bucket: process.env.REACT_APP_S3_BUCKET,
                    Key: fileName,
                    PartNumber: partNumber,
                    UploadId: uploadId,
                    Body: part,
                    ChecksumCRC32: checksumBase64, 
                }))
            );
        }

        const partResponses = await Promise.all(promises);

        await s3Client.send(new CompleteMultipartUploadCommand({
            Bucket: process.env.REACT_APP_S3_BUCKET,
            Key: fileName,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: partResponses.map((response, index) => ({
                    ETag: response.ETag,
                    PartNumber: index + 1,
                })),
            },
        }));

        const response = await axios.post(`${backendPath}/performance-analysis`, formDataToSend);
        
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