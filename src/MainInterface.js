import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import FormGenerator from "../src/FormGenerator";
import JsonEditor from "../src/JsonEditor";
// MainInterface component
var MainInterface = function () {
    var _a = useState({
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
    }), jsonSchema = _a[0], setJsonSchema = _a[1];
    var _b = useState(false), darkMode = _b[0], setDarkMode = _b[1];
    var toggleDarkMode = function () {
        setDarkMode(!darkMode);
    };
    var handleJsonEdit = function (updatedJson) {
        setJsonSchema(updatedJson);
    };
    // Explicitly cast styles to React.CSSProperties type
    var containerStyle = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "160vh",
        backgroundColor: darkMode ? "#1E1E1E" : "#F0F4F8",
        color: darkMode ? "#F0F4F8" : "#333",
        transition: "all 0.3s ease-in-out",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };
    var headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "2px solid ".concat(darkMode ? "#444" : "#ddd"),
        width: "100%",
        boxSizing: "border-box", // Correct type assignment
    };
    var headingStyle = {
        fontSize: "1.8rem",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase", // Ensure this is a valid TextTransform value
    };
    var letterStyle = function (color) { return ({
        color: color,
        padding: "0 3px",
    }); };
    var darkModeToggleStyle = {
        fontSize: "1.5rem",
        cursor: "pointer",
        backgroundColor: darkMode ? "#444" : "#fff",
        color: darkMode ? "#fff" : "#000",
        padding: "10px",
        borderRadius: "50%",
        border: "1px solid ".concat(darkMode ? "#fff" : "#ddd"),
        transition: "background-color 0.3s, color 0.3s",
    };
    var contentStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem",
        height: "calc(100% - 80px)",
        boxSizing: "border-box",
    };
    var editorStyle = {
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
    var generatorStyle = {
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
    var mobileStyles = "\n    @media (max-width: 768px) {\n      .content {\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        padding: 1rem;\n      }\n      .editor, .generator {\n        width: 90%;\n        padding: 1rem;\n      }\n      h1 {\n        font-size: 1.6rem;\n      }\n    }\n\n    @media (max-width: 480px) {\n      header {\n        flex-direction: column;\n        align-items: flex-start;\n        padding: 1rem;\n      }\n      .dark-mode-toggle {\n        margin-top: 1rem;\n      }\n      h1 {\n        font-size: 1.4rem;\n      }\n      .editor, .generator {\n        width: 100%;\n        padding: 1rem;\n      }\n    }\n  ";
    return (_jsxs("div", { style: containerStyle, children: [_jsx("style", { children: mobileStyles }), _jsxs("header", { style: headerStyle, children: [_jsxs("h1", { style: headingStyle, children: [_jsx("span", { style: letterStyle("#FF6347"), children: "F" }), _jsx("span", { style: letterStyle("#FFD700"), children: "O" }), _jsx("span", { style: letterStyle("#32CD32"), children: "R" }), _jsx("span", { style: letterStyle("#1E90FF"), children: "M" }), _jsx("span", { children: " Builder" })] }), _jsx("span", { onClick: toggleDarkMode, style: darkModeToggleStyle, children: darkMode ? "☀️" : "🌙" })] }), _jsxs("div", { className: "content", style: contentStyle, children: [_jsx("div", { className: "editor", style: editorStyle, children: _jsx(JsonEditor, { jsonData: jsonSchema, onEdit: handleJsonEdit }) }), _jsx("div", { className: "generator", style: generatorStyle, children: _jsx(FormGenerator, { schema: jsonSchema }) })] })] }));
};
export default MainInterface;
