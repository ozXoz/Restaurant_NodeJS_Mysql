import React, { useState, useEffect } from 'react';
import EmployeeApi from '../../services/employee_api';
import { useNavigate } from 'react-router-dom';
const ViewEmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await EmployeeApi.get('view', {
          headers: { 'x-access-token': token },
        });
        if (Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          alert('Failed to fetch employees');
        }
      } catch (error) {
        console.error(error);
        alert('Failed to fetch employees');
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await EmployeeApi.delete(`delete/${id}`, {
        headers: { 'x-access-token': token },
      });
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete employee');
    }
  };

  const handleUpdate = (id) => {
    // Navigate to the UpdateEmployee component with the employee's ID
    navigate(`/update/${id}`);
  };

  return (
    <div>
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.phone}</td>
              <td>{employee.address}</td>
              <td>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(employee.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployeesPage;
