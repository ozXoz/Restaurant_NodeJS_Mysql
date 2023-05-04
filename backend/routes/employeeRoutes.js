    const express = require('express');
    const employeeController = require('../controllers/employeeController');
    const authMiddleware = require('../middleware/auth');

    const router = express.Router();

    router.post('/add', authMiddleware, employeeController.addEmployee);
    router.put('/update/:id', authMiddleware, employeeController.updateEmployee);
    router.delete('/delete/:id', authMiddleware, employeeController.deleteEmployee);
    router.get('/view', authMiddleware, employeeController.viewEmployees);
    router.get('/update/:id', employeeController.getEmployeeById);

    module.exports = router;
