const connection = require('../models/employee');

exports.addEmployee = (req, res) => {
  const { first_name, last_name, email, position, phone, address } = req.body;

  connection.query(
    'INSERT INTO employees (first_name, last_name, email, position, phone, address) VALUES (?,?,?,?,?,?)',
    [first_name, last_name, email, position, phone, address],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(201).send({ message: 'Employee added successfully', id: results.insertId });
    }
  );
};

exports.updateEmployee = (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, position, phone, address } = req.body;

  connection.query(
    'UPDATE employees SET first_name=?, last_name=?, email=?, position=?, phone=?, address=? WHERE id=?',
    [first_name, last_name, email, position, phone, address, id],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(200).send({ message: 'Employee updated successfully' });
    }
  );
};

exports.deleteEmployee = (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM employees WHERE id=?', [id], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send({ message: 'Employee deleted successfully' });
  });
};

exports.viewEmployees = (req, res) => {
  connection.query('SELECT * FROM employees', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send({ employees: results });
  });
};

exports.getEmployeeById = (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM employees WHERE id=?', [id], (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (results.length === 0) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    res.status(200).send(results[0]);
  });
};
