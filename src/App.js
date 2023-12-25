import React, { useState, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the jest-dom library

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to fetch data');
    }
  };

  const indexOfLastEmployee = currentPage * perPage;
  const indexOfFirstEmployee = indexOfLastEmployee - perPage;
  const currentEmployees = data.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>Employee Data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button onClick={handleNext} disabled={currentPage === Math.ceil(data.length / perPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;