import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeApi from '../../services/employee_api';
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const handleCancel = () => {
    navigate('/employees/view');
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
const response = await EmployeeApi.get(`/update/${id}`, {
  headers: { 'x-access-token': token },
});

        console.log('Fetched employee data:', response.data);
        const { first_name, last_name, email, position, phone, address } = response.data;
        console.log(first_name)
        setFirstName(first_name);
        console.log(first_name)

        setLastName(last_name);
        setEmail(email);
        setPosition(position);
        setPhone(phone);
        setAddress(address);
        // navigate('/view');
      } catch (error) {
        console.error('Error fetching employee:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        // navigate('/view');
        // alert('Failed to fetch employee');
      }
    };
  
    fetchEmployee();
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await EmployeeApi.put(`/update/${id}`, { first_name, last_name, email, position, phone, address }, {
        headers: { 'x-access-token': token },
      });

      alert('Employee updated successfully');
      navigate('/employees/view');

    } catch (error) {
      console.error(error);
      alert('Failed to update employee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Employee</h2>
      <input
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button type="submit">Update Employee</button>
      <button type="submit" onClick={handleCancel}>Cancel</button>

    </form>
  );
};

export default UpdateEmployee;
