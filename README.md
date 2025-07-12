# Employee Directory Web Interface

A responsive web application for managing employee information with search, filter, sort, and pagination functionality.

## Features

- View employee list in card format
- Search employees by name or email
- Filter by department and role
- Sort by first name, last name, or department
- Pagination with configurable items per page
- Add new employees
- Edit existing employees
- Delete employees
- Fully responsive design (works on mobile, tablet, and desktop)

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6)
- No external libraries or frameworks (vanilla JS)

## Setup

1. Clone this repository
2. Open `index.html` in a web browser
3. No server required - runs completely client-side

## Screenshots

![Desktop View](screenshots/desktop.png)
![Mobile View](screenshots/mobile.png)

## Reflection

### Challenges Faced

- Implementing the combined search, filter, and sort functionality required careful state management
- Making the pagination work with all other features was tricky
- Form validation needed to be comprehensive but user-friendly

### Improvements

- Add more detailed employee information (phone number, hire date, etc.)
- Implement server-side persistence (currently data is only stored in memory)
- Add more advanced filtering options (date ranges, salary ranges)
- Improve accessibility features




# Employee Directory (Freemarker Frontend)

A pure frontend employee directory using Freemarker templates.

## Features
- View, add, edit, delete employees
- Search, filter, and sort functionality
- Responsive design
- Client-side data persistence

## How to Run
1. Open `index.ftlh` in browser
2. No server required - works directly from file system

## Project Structure
```
employee-directory/
├── index.ftlh         # Main template
├── form.ftlh          # Add/edit form
├── css/
│   └── style.css      # All styles
├── js/
│   ├── data.js        # Mock data handler
│   └── app.js         # Main application logic
└── README.md          # Project documentation
```



<img width="1440" height="900" alt="Image" src="https://github.com/user-attachments/assets/33abdb0d-3893-4b69-9bc7-70d6a50e5e1b" />
