import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://websfinance.azurewebsites.net/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


export default httpClient;