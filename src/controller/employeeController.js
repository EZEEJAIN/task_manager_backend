const employeesService = require('../services/employeeService')

const getEmployees = async (req, res) => {

    try {
        if (Object.keys(req.query).length === 0) {
            const employees = await employeesService.employeeList();
            return res.status(employees.status).json({ data: employees })
        }
        else {
            const employees = await employeesService.employeeByFilter(req.query);
            return res.status(employees.status).json({ data: employees })
        }
    }
    catch (error) {
        console.log("Internal server error", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { getEmployees }