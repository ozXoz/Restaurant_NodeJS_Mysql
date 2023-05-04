import axios from 'axios';

const EmployeeApi = axios.create({
  baseURL: 'http://localhost:3000/employee/',
});



export default EmployeeApi;

