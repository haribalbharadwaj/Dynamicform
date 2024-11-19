import React, { useState } from "react";
import FormGenerator from "../src/FormGenerator";
import JsonEditor from "../src/JsonEditor";

// MainInterface component
const MainInterface = () => {
  const [jsonSchema, setJsonSchema] = useState({
    formTitle: "Form Heading",
    formDescription: "Please fill out this survey about your project needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
    ],
  });

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleJsonEdit = (updatedJson: any) => {
    setJsonSchema(updatedJson);
  };

  // Explicitly cast styles to React.CSSProperties type
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "160vh",
    backgroundColor: darkMode ? "#1E1E1E" : "#F0F4F8",
    color: darkMode ? "#F0F4F8" : "#333",
    transition: "all 0.3s ease-in-out",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderBottom: `2px solid ${darkMode ? "#444" : "#ddd"}`,
    width: "100%",
    boxSizing: "border-box", // Correct type assignment
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "1.8rem",
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase", // Ensure this is a valid TextTransform value
  };

  const letterStyle = (color: string): React.CSSProperties => ({
    color: color,
    padding: "0 3px",
  });

  const darkModeToggleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    cursor: "pointer",
    backgroundColor: darkMode ? "#444" : "#fff",
    color: darkMode ? "#fff" : "#000",
    padding: "10px",
    borderRadius: "50%",
    border: `1px solid ${darkMode ? "#fff" : "#ddd"}`,
    transition: "background-color 0.3s, color 0.3s",
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2rem",
    height: "calc(100% - 80px)",
    boxSizing: "border-box",
  };

  const editorStyle: React.CSSProperties = {
    width: "50%",
    padding: "1rem",
    marginBottom: "2rem",
    borderRadius: "8px",
    left: "25%",
    top: "20%",
    position: "absolute", // Valid position value
    backgroundColor: darkMode ? "#2A2A2A" : "#fff",
    boxShadow: darkMode
      ? "0 4px 10px rgba(0, 0, 0, 0.7)"
      : "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, box-shadow 0.3s",
  };

  const generatorStyle: React.CSSProperties = {
    width: "50%",
    left: "25%",
    top: "90%",
    position: "absolute", // Valid position value
    padding: "1rem",
    marginBottom: "2rem",
    borderRadius: "8px",
    backgroundColor: darkMode ? "#2A2A2A" : "#fff",
    boxShadow: darkMode
      ? "0 4px 10px rgba(0, 0, 0, 0.7)"
      : "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, box-shadow 0.3s",
  };

  const mobileStyles = `
    @media (max-width: 768px) {
      .content {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      .editor, .generator {
        width: 90%;
        padding: 1rem;
      }
      h1 {
        font-size: 1.6rem;
      }
    }

    @media (max-width: 480px) {
      header {
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
      }
      .dark-mode-toggle {
        margin-top: 1rem;
      }
      h1 {
        font-size: 1.4rem;
      }
      .editor, .generator {
        width: 100%;
        padding: 1rem;
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{mobileStyles}</style>

      {/* Header */}
      <header style={headerStyle}>
        <h1 style={headingStyle}>
          <span style={letterStyle("#FF6347")}>F</span>
          <span style={letterStyle("#FFD700")}>O</span>
          <span style={letterStyle("#32CD32")}>R</span>
          <span style={letterStyle("#1E90FF")}>M</span>
          <span> Builder</span>
        </h1>
        <span onClick={toggleDarkMode} style={darkModeToggleStyle}>
          {darkMode ? "☀️" : "🌙"}
        </span>
      </header>

      {/* Content */}
      <div className="content" style={contentStyle}>
        {/* JSON Editor */}
        <div className="editor" style={editorStyle}>
          <JsonEditor jsonData={jsonSchema} onEdit={handleJsonEdit} />
        </div>

        {/* Form Generator */}
        <div className="generator" style={generatorStyle}>
          <FormGenerator schema={jsonSchema} />
        </div>
      </div>
    </div>
  );
};

export default MainInterface;
