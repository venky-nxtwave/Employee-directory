// Mock employee data
const mockEmployees = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        department: 'HR',
        role: 'Manager'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 3,
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        department: 'Finance',
        role: 'Analyst'
    },
    {
        id: 4,
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'emily.williams@example.com',
        department: 'Marketing',
        role: 'Designer'
    },
    {
        id: 5,
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert.brown@example.com',
        department: 'IT',
        role: 'Developer'
    },
    {
        id: 6,
        firstName: 'Sarah',
        lastName: 'Davis',
        email: 'sarah.davis@example.com',
        department: 'HR',
        role: 'Recruiter'
    },
    {
        id: 7,
        firstName: 'David',
        lastName: 'Miller',
        email: 'david.miller@example.com',
        department: 'Finance',
        role: 'Accountant'
    },
    {
        id: 8,
        firstName: 'Jennifer',
        lastName: 'Wilson',
        email: 'jennifer.wilson@example.com',
        department: 'Marketing',
        role: 'Manager'
    },
    {
        id: 9,
        firstName: 'Thomas',
        lastName: 'Moore',
        email: 'thomas.moore@example.com',
        department: 'IT',
        role: 'System Admin'
    },
    {
        id: 10,
        firstName: 'Lisa',
        lastName: 'Taylor',
        email: 'lisa.taylor@example.com',
        department: 'HR',
        role: 'Benefits Specialist'
    }
    
    
];
/*
data.js 
// This file initializes the employee data and provides functions to manage it. 
// It uses localStorage to persist data across sessions. 
// It is designed to be used in conjunction with the employee directory application. 
// It includes functions to save employee data and retrieve the next available ID for new employees. 
// It also initializes with some mock employee data if no data exists in localStorage. 


// Initialize employee data
let employees = JSON.parse(localStorage.getItem('employees')) || [
    {id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', department: 'HR', role: 'Manager'},
    {id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', department: 'IT', role: 'Developer'},
    {id: 3, firstName: 'Robert', lastName: 'Johnson', email: 'robert.j@example.com', department: 'Finance', role: 'Analyst'}
];

// Save to localStorage
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Get next available ID
function getNextId() {
    return employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
}

*/ 