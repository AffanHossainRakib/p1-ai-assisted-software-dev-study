# AI-Assisted Software Development Study

## Objective

You are asked to build a small frontend application using any tools, technologies, AI assistants, documentation, or online resources you normally use during software development.

You may use ChatGPT, Claude, Cursor, Copilot, Stack Overflow, official documentation, Google searches, or any other resources.

We are interested in understanding your normal development workflow.

## Time Limit

45 Minutes

## Scenario

You have been asked to create a simple Student Management System prototype for a university department.

The application should use browser localStorage for persistence.

A seed dataset will be provided.

## Requirements

### 1. Student Registration

Create a form that allows users to add new students.

Required fields:

* Student ID
* Name
* Email
* Program
* Academic Year

Display all students in a table.

### 2. Course Enrollment

Create a form that allows enrolling a student into a course.

Required fields:

* Enrollment ID
* Student ID
* Course ID
* Enrollment Date

Display all enrollments in a table.



### 3. Grade Submission

Create a form that allows submitting grades.

Required fields:

* Grade ID
* Student ID
* Course ID
* Grade
* Semester

Display all submitted grades in a table.

Validation Requirement:

* Grade must be between 0 and 100.

Display all grades in a table.

### Data Persistence

Use localStorage to store newly added records.

The application should load the provided seed data on first run.

### Validation

Use any form validation library of your choice.

### Bonus Features (Optional)

* **Student ID Validation**

  * Validate the student ID format: `2620009`
  * Format breakdown:

    * First 2 digits (`26`) → Admission year
    * Third digit (`2`) → Shift (`1 = Morning`, `2 = Day`)
    * Last 4 digits (`0009`) → Student serial number
  * Student registration will only be for the current year. Show an appropriate validation error if the format is invalid. 

* **User-Friendly Error Handling**

  * Display validation errors near the corresponding input fields.
  * Optionally use toast notifications for form submission success/failure messages.

* **Table Features**

  * Implement searching/filtering for table data.
  * Implement sorting on relevant columns.
  * Implement pagination for large datasets.

* **URL State Persistence**

  * Persist table state in the URL, including:

    * Search query
    * Sort field and direction
    * Current page
    * Applied filters
  * Refreshing or sharing the URL should preserve the current table view.

### Example URL

```text
/students?page=2&search=ayesha&sort=name&order=asc
```

### Seed Data

```ts
export const seedData = {
  students: [
    {
      id: "2620001",
      name: "Ayesha Rahman",
      email: "ayesha@uni.edu",
      program: "CSE",
      year: 2,
    },
    {
      id: "2620002",
      name: "Tanvir Hossain",
      email: "tanvir@uni.edu",
      program: "EEE",
      year: 3,
    },
    {
      id: "2620003",
      name: "Priya Das",
      email: "priya@uni.edu",
      program: "CSE",
      year: 1,
    },
  ],

  courses: [
    {
      id: "C101",
      name: "Data Structures",
      credits: 3,
      instructor: "Dr. Karim",
      seats: 30,
    },
    {
      id: "C102",
      name: "Web Engineering",
      credits: 3,
      instructor: "Dr. Noor",
      seats: 25,
    },
    {
      id: "C103",
      name: "Database Systems",
      credits: 4,
      instructor: "Dr. Islam",
      seats: 20,
    },
  ],

  enrollments: [
    {
      id: "E001",
      studentId: "2620001",
      courseId: "C101",
      date: "2026-01-15",
    },
    {
      id: "E002",
      studentId: "2620002",
      courseId: "C102",
      date: "2026-01-16",
    },
  ],

  grades: [
    {
      id: "G001",
      studentId: "2620001",
      courseId: "C101",
      grade: 88,
      semester: "Spring 2026",
    },
  ],
};
```

### Freedom of Implementation

You are free to:

* Choose any framework
* Choose any UI library
* Organize files however you want
* Use any AI tools you normally use
* Use any coding workflow you prefer

We are interested in observing your natural development process.
