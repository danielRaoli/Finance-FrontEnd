import axios from "axios";

const httpClient = axios.create({
    baseURL: 'https://financeweb-gaf7ccdtbuh2fzg9.eastus-01.azurewebsites.net/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


export default httpClient;