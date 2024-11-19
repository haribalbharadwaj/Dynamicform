import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
var JsonEditor = function (_a) {
    var jsonData = _a.jsonData, onEdit = _a.onEdit;
    var _b = useState(JSON.stringify(jsonData, null, 2)), editorContent = _b[0], setEditorContent = _b[1];
    var _c = useState([]), jsonErrorLines = _c[0], setJsonErrorLines = _c[1]; // Track error lines
    var _d = useState(null), duplicateIdError = _d[0], setDuplicateIdError = _d[1]; // Error for duplicate IDs
    var handleInputChange = function (e) {
        var updatedJson = e.target.value;
        setEditorContent(updatedJson);
        try {
            var parsedJson = JSON.parse(updatedJson);
            // Check for duplicate IDs before updating the parent
            var duplicateId = checkForDuplicateIds(parsedJson);
            if (duplicateId) {
                setDuplicateIdError("Duplicate ID detected: ".concat(duplicateId));
                return; // Stop further processing if duplicate ID is found
            }
            setDuplicateIdError(null); // Clear duplicate ID error if no duplicates are found
            setJsonErrorLines([]); // Clear error lines if JSON is valid
            onEdit(parsedJson); // Pass valid JSON to parent
        }
        catch (error) {
            var invalidLines = getErrorLines(updatedJson);
            setJsonErrorLines(invalidLines); // Set error lines if invalid JSON
            setDuplicateIdError(null); // Clear duplicate ID error if JSON is invalid
        }
    };
    // Helper function to get the lines with errors
    var getErrorLines = function (jsonString) {
        var lines = jsonString.split("\n");
        var errorLines = [];
        try {
            JSON.parse(jsonString); // Try parsing the JSON
        }
        catch (err) {
            var message = err.message;
            var match = message.match(/line (\d+)/); // Extract the error line number from the message
            if (match && match[1]) {
                var lineNumber = parseInt(match[1], 10);
                errorLines.push(lineNumber - 1); // Add the line number with the error (zero-based)
            }
        }
        return errorLines;
    };
    // Function to check for duplicate IDs in the JSON object
    var checkForDuplicateIds = function (obj) {
        var _a;
        var ids = [];
        for (var key in obj) {
            if (obj[key] && typeof obj[key] === "object") {
                var id = (_a = obj[key]) === null || _a === void 0 ? void 0 : _a.id; // Assuming the id is stored as `id` in each object
                if (id) {
                    if (ids.includes(id)) {
                        return id; // Return the first duplicate id
                    }
                    ids.push(id);
                }
            }
            // Recursively check nested objects if any
            if (typeof obj[key] === "object") {
                var duplicate = checkForDuplicateIds(obj[key]);
                if (duplicate)
                    return duplicate;
            }
        }
        return null; // Return null if no duplicates are found
    };
    // Adjust textarea style for better fit in MainInterface and responsiveness
    var textareaStyle = {
        width: "100%",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "14px",
        resize: "vertical", // This is valid now
        color: "black",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        transition: "all 0.3s ease-in-out",
    };
    var mobileStyle = "\n    @media (max-width: 768px) {\n      textarea {\n        width: 100px;\n        height: 250px; /* Adjust height for tablets */\n      }\n    }\n\n    @media (max-width: 480px) {\n      textarea {\n      width: 100px;\n        height: 200px; /* Adjust height for mobile screens */\n      }\n    }\n  ";
    return (_jsxs("div", { children: [_jsx("style", { children: mobileStyle }), _jsx("textarea", { style: textareaStyle, value: editorContent, onChange: handleInputChange, placeholder: "Enter JSON here..." }), _jsx("div", { style: { fontFamily: "monospace", whiteSpace: "pre-wrap" }, children: editorContent.split("\n").map(function (line, idx) { return (
                // Only render the lines with errors, otherwise display an empty string for non-error lines
                jsonErrorLines.includes(idx) ? (_jsx("div", { style: {
                        color: "red", // Highlight error lines in red
                        backgroundColor: "rgba(255, 0, 0, 0.2)", // Optional: background highlight
                        padding: "2px 0",
                    }, children: line }, idx)) : null); }) }), duplicateIdError && (_jsx("div", { style: { color: "red", marginTop: "10px" }, children: duplicateIdError }))] }));
};
export default JsonEditor;
