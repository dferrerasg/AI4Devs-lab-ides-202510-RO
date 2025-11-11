# Add Candidate Feature – Frontend Task Plan

## Overview

Enable recruiters to add job candidates via a modal form in the frontend. The form is accessible, validates all fields, and submits data to the backend. UI uses a clean design with black and `#ffdf6e` color scale.

## Tasks

1. **Design UI/UX for Add Candidate Modal**
   - Plan a clean, accessible modal form using black and `#ffdf6e` color scale.
   - Modal opens from main page.

2. **Add "Add Candidate" Button to Main Page**
   - Place a clearly labeled button in `App.tsx` to open the modal.

3. **Implement Candidate Form Component**
   - Custom form inside modal.
   - Fields: name, last name, email, phone, address, education, working experience, CV upload (PDF/DOCX, single file).
   - Use semantic HTML and proper labels.

4. **Form Validation and Error Tooltips**
   - Validate each field (type, format, required).
   - Show accessible tooltips for errors.
   - Prevent submission until all data is valid.

5. **CV File Upload Handling**
   - Accept only one file (PDF/DOCX).
   - Show file name and allow removal before submit.

6. **Submit Data to Backend**
   - On valid submit, send data to `POST /candidates` API using FormData.
   - Handle API response (success/error).

7. **Display Result in Toast Notification**
   - Show success or error message in a toast popup.
   - Use accessible ARIA roles for feedback.

8. **Styling and Responsiveness**
   - Use CSS for mobile-first, responsive design.
   - Test on various device sizes.

9. **Accessibility Testing**
   - Test with keyboard and screen readers.
   - Ensure all form controls are reachable and labeled.

10. **Unit and Integration Tests**
    - Write tests for form validation, submission, and UI states using React Testing Library.

11. **Form Reset After Submission**
    - Reset form fields and close modal after successful submission.

---

**Confirmed requirements:**
- Modal for form
- Custom components
- Single CV file upload
- Toast for notifications
- No extra accessibility requirements
- Form resets after submit
