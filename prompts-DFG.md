# Exercise

## 1 - Propose copilot instructions

@workspace propose copilot instructions for this project based on structure and the following guides:
- backend runs on Node and Express with Prisma for ORM, and structure should follow DDD and TDD
- frontend is React based and UI needs to be accessible and resposive to all kind of devices
- Database is PostgressSQL with proper relations and securization of sensitive data

---

Add them to the project

## 2 - Propose tasks to perform the backend development

You are an expert full stack Node developer.

Task: Give the possibility to a recruiter to add a job candidate to the system.

Requirements:
* This task only includes development on the backend side of the project.
* This funcionality must be exposed via POST request
* Candidate information includes: name, last name, email, phone, adress, education, working experience. Optionally, it can include a CV in PDF or DOCX format
* all sensitive information must be encrypted
* Data and format must be valid for each data type. If not, it needs to return the causing error in the response with proper status code
* Connection to DB errors must be handled and return proper status code
* All files uploaded should be stored in a folder

Follow the guidelines in copilot-instructions

Don't make any changes to the code yet.

Propose the tasks to perform to make this

Ask any questions you have before making any decision

---

Proceed but confirm with me every step of the process

---

Write the plan into a .md file in a prompt-plan folder

---

Implement the changes in #file:candidate-feature-plan.md 

> I got plenty of errors in test files but after retries everything was fixed

---

@workspace Update copilot instructions to reflect the changes in the backend

## 3 - Propose tasks to perform the frontend development

You are an expert front end React developer.

Task: Give the possibility to a recruiter to add a job candidate to the system.

Requirements:
* This task only includes development on the frontend side of the project.
* Add a button to the main page to open the form for adding a new candidate
* The form must be accessible and include all candidate fields
* Candidate information includes: name, last name, email, phone, adress, education, working experience. Optionally, it can include a CV in PDF or DOCX format
* Data and format must be valid for each data type. If not, it needs to show a tooltip in the field indicating the error.
* The form can't be submitted until all data is correct
* When submitted, the data in the form must be sent to the backend API `POST /candidates` and display the result in a popup message with success or error styles.
* The design for the UI must be clean and intuitive with color scale of black and `#ffdf6e`

Follow the guidelines in copilot-instructions

Don't make any changes to the code yet.

Propose the tasks to perform to make this

Ask any questions you have before making any decision

---

Write the plan into a cadidate-feature-frontend-plan.md file in a prompt-plan folder

---

Implement the changes in #file:candidate-feature-frontend-plan.md 

> I got plenty of errors in test files but after retries everything was fixed

## Fix errors - APP still not working :(

    