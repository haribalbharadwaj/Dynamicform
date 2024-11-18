
# Dynamic Form Builder

A powerful and customizable Dynamic Form Builder that allows users to easily create and manage forms with a variety of field types. The form schema is defined using JSON, and the generated forms are interactive and can be shared or embedded in other applications.


## Features 
Dynamic Form Creation: Users can add various types of form fields such as text inputs, dropdowns, checkboxes, images, videos, etc.
Field Validation: Ensures that form fields meet specified validation criteria before submission.
User-Friendly Interface: Simple drag-and-drop UI to arrange form fields.
Real-Time Data Display: View form data in real-time and submit responses.
Export to JSON: Forms can be downloaded as JSON files for further use or processing.
Responsive Design: Optimized for use on both desktop and mobile devices.

### Technologies Used
React: For building the user interface.
TypeScript: For type safety and enhanced developer experience.
React Hook Form: For handling form state and validation.
Jest & Playwright: For testing the application.
CSS Modules: For scoped styling.
Vercel: For deployment.

#### Getting Started 
Prerequisites
Node.js (v14 or above)
npm (or Yarn)
Git
Installation


1.Clone the repository Install dependencies : git clone https://github.com/your-username/dynamic-form-builder.git
                                               cd dynamic-form-builder

2.Install dependencies : npm install

3.Run the application locally:npm run dev


4.Run tests (optional): npm run test


5.Deploy on Vercel: Deploy the app using Vercel

##### Example JSON Schemas  
1: Basic Contact Form 

{
  "formTitle": "Contact Form",
  "fields": [
  {
      "type": "text",
      "label": "Name",
      "name": "name",
      "placeholder": "Enter your name",
      "required": true
    },
    {
      "type": "email",
      "label": "Email",
      "name": "email",
      "placeholder": "Enter your email",
      "required": true
    },
    {
      "type": "number",
      "label": "Phone",
      "name": "phone",
      "placeholder": "Enter your phone number"
    },
    {
      "type": "textarea",
      "label": "Message",
      "name": "message",
      "placeholder": "Write your message",
      "required": true
    },
    {
     "type": "submit",
      "label": "Send Message"
    }
  ]
}


2. Product Feedback
   
{
  "formTitle": "Product Feedback",
  "fields": [
    {
      "type": "text",
      "label": "Full Name",
      "name": "fullName",
      "placeholder": "Enter your full name",
      "required": true
    },
    {
      "type": "rating",
      "label": "Rate Our Product",
      "name": "rating",
      "min": 1,
      "max": 5,
      "required": true
    },
    {
      "type": "textarea",
      "label": "Feedback",
      "name": "feedback",
      "placeholder": "Share your thoughts",
      "required": true
    },
    {
      "type": "file",
      "label": "Upload Image",
      "name": "uploadImage",
      "accept": "image/*"
    },
    {
      "type": "submit",
      "label": "Submit Feedback"
    }
  ]
}

3. Event Registration form

{
  "formTitle": "Event Registration",
  "fields": [
    {
      "type": "text",
      "label": "First Name",
      "name": "firstName",
      "placeholder": "Enter your first name",
      "required": true
    },
    {
      "type": "text",
      "label": "Last Name",
      "name": "lastName",
      "placeholder": "Enter your last name",
      "required": true
    },
    {
      "type": "email",
      "label": "Email Address",
      "name": "email",
      "placeholder": "Enter your email",
      "required": true
    },
    {
      "type": "select",
      "label": "Ticket Type",
      "name": "ticketType",
      "options": [
        { "label": "VIP", "value": "vip" },
        { "label": "Regular", "value": "regular" },
        { "label": "Student", "value": "student" }
      ],
      "required": true
    },
    {
      "type": "date",
      "label": "Event Date",
      "name": "eventDate",
      "required": true
    },
    {
      "type": "submit",
      "label": "Register"
    }
  ]
}



  
