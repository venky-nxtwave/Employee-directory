document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const employeeList = document.getElementById('employee-list');
    const searchInput = document.getElementById('search');
    const filterBtn = document.getElementById('filter-btn');
    const filterPanel = document.getElementById('filter-panel');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const departmentFilter = document.getElementById('department-filter');
    const roleFilter = document.getElementById('role-filter');
    const sortBy = document.getElementById('sort-by');
    const addEmployeeBtn = document.getElementById('add-employee');
    const modal = document.getElementById('employee-form-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const employeeForm = document.getElementById('employee-form');
    const formTitle = document.getElementById('form-title');
    const employeeIdInput = document.getElementById('employee-id');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const itemsPerPageSelect = document.getElementById('items-per-page');

    // State variables
    let currentPage = 1;
    let itemsPerPage = 10;
    let filteredEmployees = [...mockEmployees];
    let currentFilters = {
        department: '',
        role: ''
    };
    let currentSort = 'firstName';

    // Initialize the app
    function init() {
        renderEmployeeList();
        setupEventListeners();
        updatePagination();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Search
        searchInput.addEventListener('input', handleSearch);

        // Filter
        filterBtn.addEventListener('click', toggleFilterPanel);
        applyFiltersBtn.addEventListener('click', applyFilters);
        resetFiltersBtn.addEventListener('click', resetFilters);

        // Sort
        sortBy.addEventListener('change', handleSort);

        // Add/Edit Employee
        addEmployeeBtn.addEventListener('click', openAddEmployeeForm);
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        employeeForm.addEventListener('submit', handleFormSubmit);

        // Pagination
        prevPageBtn.addEventListener('click', goToPrevPage);
        nextPageBtn.addEventListener('click', goToNextPage);
        itemsPerPageSelect.addEventListener('change', handleItemsPerPageChange);
    }

    // Render employee list
    function renderEmployeeList() {
        // Clear current list
        employeeList.innerHTML = '';

        // Get employees for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const employeesToDisplay = filteredEmployees.slice(startIndex, endIndex);

        if (employeesToDisplay.length === 0) {
            employeeList.innerHTML = '<p class="no-results">No employees found matching your criteria.</p>';
            return;
        }

        // Create employee cards
        employeesToDisplay.forEach(employee => {
            const card = document.createElement('div');
            card.className = 'employee-card';
            card.innerHTML = `
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p>ID: ${employee.id}</p>
                <p>Email: ${employee.email}</p>
                <p>Department: ${employee.department}</p>
                <p>Role: ${employee.role}</p>
                <div class="employee-actions">
                    <button class="edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="delete-btn" data-id="${employee.id}">Delete</button>
                </div>
            `;
            employeeList.appendChild(card);
        });

        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => openEditEmployeeForm(btn.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteEmployee(btn.dataset.id));
        });
    }

    // Search functionality
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        filteredEmployees = mockEmployees.filter(employee => {
            const matchesSearch = 
                employee.firstName.toLowerCase().includes(searchTerm) ||
                employee.lastName.toLowerCase().includes(searchTerm) ||
                employee.email.toLowerCase().includes(searchTerm);
            
            const matchesDepartment = 
                !currentFilters.department || 
                employee.department === currentFilters.department;
            
            const matchesRole = 
                !currentFilters.role || 
                employee.role === currentFilters.role;
            
            return matchesSearch && matchesDepartment && matchesRole;
        });

        currentPage = 1;
        renderEmployeeList();
        updatePagination();
    }

    // Filter functionality
    function toggleFilterPanel() {
        filterPanel.classList.toggle('hidden');
    }

    function applyFilters() {
        currentFilters = {
            department: departmentFilter.value,
            role: roleFilter.value
        };

        filteredEmployees = mockEmployees.filter(employee => {
            const matchesDepartment = 
                !currentFilters.department || 
                employee.department === currentFilters.department;
            
            const matchesRole = 
                !currentFilters.role || 
                employee.role === currentFilters.role;
            
            return matchesDepartment && matchesRole;
        });

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredEmployees = filteredEmployees.filter(employee => 
                employee.firstName.toLowerCase().includes(searchTerm) ||
                employee.lastName.toLowerCase().includes(searchTerm) ||
                employee.email.toLowerCase().includes(searchTerm)
            );
        }

        currentPage = 1;
        renderEmployeeList();
        updatePagination();
        filterPanel.classList.add('hidden');
    }

    function resetFilters() {
        departmentFilter.value = '';
        roleFilter.value = '';
        currentFilters = {
            department: '',
            role: ''
        };
        filteredEmployees = [...mockEmployees];
        
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredEmployees = filteredEmployees.filter(employee => 
                employee.firstName.toLowerCase().includes(searchTerm) ||
                employee.lastName.toLowerCase().includes(searchTerm) ||
                employee.email.toLowerCase().includes(searchTerm)
            );
        }

        currentPage = 1;
        renderEmployeeList();
        updatePagination();
        filterPanel.classList.add('hidden');
    }

    // Sort functionality
    function handleSort() {
        const sortValue = sortBy.value;
        
        filteredEmployees.sort((a, b) => {
            switch (sortValue) {
                case 'firstName':
                    return a.firstName.localeCompare(b.firstName);
                case 'firstNameDesc':
                    return b.firstName.localeCompare(a.firstName);
                case 'lastName':
                    return a.lastName.localeCompare(b.lastName);
                case 'lastNameDesc':
                    return b.lastName.localeCompare(a.lastName);
                case 'department':
                    return a.department.localeCompare(b.department);
                case 'departmentDesc':
                    return b.department.localeCompare(a.department);
                default:
                    return 0;
            }
        });

        currentPage = 1;
        renderEmployeeList();
        updatePagination();
    }

    // Add/Edit Employee functionality
    function openAddEmployeeForm() {
        formTitle.textContent = 'Add New Employee';
        employeeIdInput.value = '';
        employeeForm.reset();
        clearErrorMessages();
        modal.classList.remove('hidden');
    }

    function openEditEmployeeForm(id) {
        const employee = mockEmployees.find(emp => emp.id === Number(id));
        if (!employee) return;

        formTitle.textContent = 'Edit Employee';
        employeeIdInput.value = employee.id;
        document.getElementById('first-name').value = employee.firstName;
        document.getElementById('last-name').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        clearErrorMessages();
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
    }

    function validateForm() {
        let isValid = true;
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const department = document.getElementById('department').value;
        const role = document.getElementById('role').value.trim();

        // Validate first name
        if (!firstName) {
            document.getElementById('first-name-error').textContent = 'First name is required';
            isValid = false;
        } else {
            document.getElementById('first-name-error').textContent = '';
        }

        // Validate last name
        if (!lastName) {
            document.getElementById('last-name-error').textContent = 'Last name is required';
            isValid = false;
        } else {
            document.getElementById('last-name-error').textContent = '';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            document.getElementById('email-error').textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            document.getElementById('email-error').textContent = '';
        }

        // Validate department
        if (!department) {
            document.getElementById('department-error').textContent = 'Department is required';
            isValid = false;
        } else {
            document.getElementById('department-error').textContent = '';
        }

        // Validate role
        if (!role) {
            document.getElementById('role-error').textContent = 'Role is required';
            isValid = false;
        } else {
            document.getElementById('role-error').textContent = '';
        }

        return isValid;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const id = employeeIdInput.value;
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const department = document.getElementById('department').value;
        const role = document.getElementById('role').value.trim();

        if (id) {
            // Edit existing employee
            const index = mockEmployees.findIndex(emp => emp.id === Number(id));
            if (index !== -1) {
                mockEmployees[index] = {
                    id: Number(id),
                    firstName,
                    lastName,
                    email,
                    department,
                    role
                };
            }
        } else {
            // Add new employee
            const newId = mockEmployees.length > 0 ? 
                Math.max(...mockEmployees.map(emp => emp.id)) + 1 : 1;
            
            mockEmployees.push({
                id: newId,
                firstName,
                lastName,
                email,
                department,
                role
            });
        }

        // Reapply current filters and search
        applyFilters();
        closeModal();
    }

    // Delete employee
    function deleteEmployee(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            const index = mockEmployees.findIndex(emp => emp.id === Number(id));
            if (index !== -1) {
                mockEmployees.splice(index, 1);
                
                // Reapply current filters and search
                applyFilters();
            }
        }
    }

    // Pagination functionality
    function updatePagination() {
        const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
        
        // Update page info
        pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
        
        // Enable/disable previous button
        prevPageBtn.disabled = currentPage === 1;
        
        // Enable/disable next button
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderEmployeeList();
            updatePagination();
        }
    }

    function goToNextPage() {
        const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderEmployeeList();
            updatePagination();
        }
    }

    function handleItemsPerPageChange() {
        itemsPerPage = parseInt(itemsPerPageSelect.value);
        currentPage = 1;
        renderEmployeeList();
        updatePagination();
    }

    // Initialize the application
    init();
});

/* 

app.ftlh
// This file contains the main logic for the employee directory application. 
// It handles rendering the employee list, searching, filtering, sorting, pagination,
// and adding/editing employees. 
// It uses mock data for demonstration purposes and is designed to be used with the employee directory HTML structure.  

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI elements
    const employeeList = document.getElementById('employee-list');
    const searchInput = document.getElementById('search');
    const filterBtn = document.getElementById('filter-btn');
    const filterPanel = document.getElementById('filter-panel');
    const addEmployeeBtn = document.getElementById('add-employee');
    const employeeForm = document.getElementById('employee-form');
    
    // Current state
    let currentPage = 1;
    let itemsPerPage = 10;
    let filteredEmployees = [...employees];
    let currentFilters = { department: '', role: '' };
    
    // Initialize the app
    renderEmployeeList();
    setupEventListeners();
    
    function renderEmployeeList() {
        // Pagination logic
        const startIdx = (currentPage - 1) * itemsPerPage;
        const paginatedEmployees = filteredEmployees.slice(startIdx, startIdx + itemsPerPage);
        
        employeeList.innerHTML = paginatedEmployees.map(emp => `
            <div class="employee-card" data-employee-id="${emp.id}">
                <h3>${emp.firstName} ${emp.lastName}</h3>
                <p>ID: ${emp.id}</p>
                <p>Email: ${emp.email}</p>
                <p>Department: ${emp.department}</p>
                <p>Role: ${emp.role}</p>
                <div class="employee-actions">
                    <button class="edit-btn" data-id="${emp.id}">Edit</button>
                    <button class="delete-btn" data-id="${emp.id}">Delete</button>
                </div>
            </div>
        `).join('');
        
        updatePagination();
    }
    
    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', handleSearch);
        
        // Filter controls
        filterBtn.addEventListener('click', () => filterPanel.classList.toggle('hidden'));
        document.getElementById('apply-filters').addEventListener('click', applyFilters);
        document.getElementById('reset-filters').addEventListener('click', resetFilters);
        
        // Sort controls
        document.getElementById('sort-by').addEventListener('change', handleSort);
        
        // Employee actions
        addEmployeeBtn.addEventListener('click', showAddForm);
        
        // Form handling
        if (employeeForm) {
            employeeForm.addEventListener('submit', handleFormSubmit);
            document.getElementById('cancel-btn').addEventListener('click', () => {
                window.location.href = 'index.ftlh';
            });
        }
    }
    
    // All other functions (handleSearch, applyFilters, etc.) remain similar
    // to previous implementation but work with the localStorage data
}); 
*/  