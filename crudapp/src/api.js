import Axios from 'axios';
const API = Axios.create({
    baseURL: 'http://localhost:5000/api/',
    // timeout: 1000,
    headers: {
        'Accept':'*/*',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": ['DELETE', 'POST', 'GET', 'OPTIONS'], 
        'Content-Type': 'application/json',
        'Authorization':"Token i84r3iuef3948uf3i4ur934r"
        // 'Authorization':"Bearer i84r3iuef3948uf3i4ur934r"
     }
});

export default API