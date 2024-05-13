const constants = require("../utils/constants");

const employeeList = async () => {
    try {
        const employees = [
            {
                id: 1,
                name: "Amam",
                email: "aman.khandelwal1205@gmail.com",
                salary: 90000
            },
            {
                id: 2,
                name: "Ezee",
                email: "ezee.jain@gmail.com",
                salary: 70000
            },
            {
                id: 3,
                name: "Rakshita",
                email: "rakshita@gmail.com",
                salary: 50000
            },
            {
                id: 4,
                name: "Shobhit",
                email: "shobhit@gmail.com",
                salary: 40000
            }
        ]

        return { allEmployees: employees, status: 200, message: "Employees fetched successfully" };
    } catch (error) {
        console.error(error);
        return { employees: [], status: 500, message: "Failed to fetch employees." }
    }
}


const employeeByFilter = async (query) => {
    try {
        let employees = [
            {
                id: 1,
                name: "Amam",
                email: "aman.khandelwal1205@gmail.com",
                salary: 90000
            },
            {
                id: 2,
                name: "Ezee",
                email: "ezee.jain@gmail.com",
                salary: 70000
            },
            {
                id: 3,
                name: "Rakshita",
                email: "rakshita@gmail.com",
                salary: 50000
            },
            {
                id: 4,
                name: "Shobhit",
                email: "shobhit@gmail.com",
                salary: 40000
            }
        ]

        let filterEmployees;

        if (query.salary && query.name) {
            filterEmployees = employees.filter((employee, index) => {
                return employee.salary > query.salary && employee.name === query.name
            })
        } else if (query.name) {
            filterEmployees = employees.filter((employee, index) => {
                return employee.name === query.name
            })
        } else if (query.salary) {
            filterEmployees = employees.filter((employee, index) => {
                return employee.salary > query.salary
            })
        } 

        return { allEmployees: filterEmployees, status: 200, message: "Employees fetched successfully" };
    } catch (error) {
        console.error(error);
        return { employees: [], status: 500, message: "Failed to fetch employees." }
    }
}
module.exports = { employeeList, employeeByFilter };


