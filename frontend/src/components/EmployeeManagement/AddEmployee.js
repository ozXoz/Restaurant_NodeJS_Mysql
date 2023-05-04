import React, { useState } from 'react';
import EmployeeApi from '../../services/employee_api';
import { useNavigate } from 'react-router-dom';


const AddEmployeePage = () => {
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };
  const handleCancel = () => {
    navigate('/employees/view');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await EmployeeApi.post('add', employeeData, {
        headers: { 'x-access-token': token },
      });
      if (response.status === 200) {
        alert('Employee added successfully');
        navigate('/employees/view');
      } else {
        throw new Error('Failed to add employee');
      }
    } catch (error) {
      console.error(error);
      console.log(error.response);
      // alert('Failed to add employee');
      navigate('/employees/view');
    }
  };
  
  

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={employeeData.first_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={employeeData.last_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={employeeData.position}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={employeeData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={employeeData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Employee</button>
        <button type="submit" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
