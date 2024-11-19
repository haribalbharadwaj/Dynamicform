import React, { useState } from "react";

// Define the type for the props
interface JsonEditorProps {
  jsonData: object; // The JSON schema data
  onEdit: (updatedJson: object) => void; // The function to handle the edited JSON
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonData, onEdit }) => {
  const [editorContent, setEditorContent] = useState(JSON.stringify(jsonData, null, 2));
  const [jsonErrorLines, setJsonErrorLines] = useState<number[]>([]); // Track error lines
  const [duplicateIdError, setDuplicateIdError] = useState<string | null>(null); // Error for duplicate IDs

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedJson = e.target.value;
    setEditorContent(updatedJson);

    try {
      const parsedJson = JSON.parse(updatedJson);

      // Check for duplicate IDs before updating the parent
      const duplicateId = checkForDuplicateIds(parsedJson);
      if (duplicateId) {
        setDuplicateIdError(`Duplicate ID detected: ${duplicateId}`);
        return; // Stop further processing if duplicate ID is found
      }

      setDuplicateIdError(null); // Clear duplicate ID error if no duplicates are found
      setJsonErrorLines([]); // Clear error lines if JSON is valid
      onEdit(parsedJson); // Pass valid JSON to parent
    } catch (error) {
      const invalidLines = getErrorLines(updatedJson);
      setJsonErrorLines(invalidLines); // Set error lines if invalid JSON
      setDuplicateIdError(null); // Clear duplicate ID error if JSON is invalid
    }
  };

  // Helper function to get the lines with errors
  const getErrorLines = (jsonString: string): number[] => {
    const lines = jsonString.split("\n");
    const errorLines: number[] = [];

    try {
      JSON.parse(jsonString); // Try parsing the JSON
    } catch (err) {
      const message = (err as Error).message;
      const match = message.match(/line (\d+)/); // Extract the error line number from the message
      if (match && match[1]) {
        const lineNumber = parseInt(match[1], 10);
        errorLines.push(lineNumber - 1); // Add the line number with the error (zero-based)
      }
    }

    return errorLines;
  };

  // Function to check for duplicate IDs in the JSON object
  const checkForDuplicateIds = (obj: any): string | null => {
    const ids: string[] = [];
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "object") {
        const id = obj[key]?.id; // Assuming the id is stored as `id` in each object
        if (id) {
          if (ids.includes(id)) {
            return id; // Return the first duplicate id
          }
          ids.push(id);
        }
      }
      // Recursively check nested objects if any
      if (typeof obj[key] === "object") {
        const duplicate = checkForDuplicateIds(obj[key]);
        if (duplicate) return duplicate;
      }
    }
    return null; // Return null if no duplicates are found
  };

  // Adjust textarea style for better fit in MainInterface and responsiveness
  const textareaStyle: React.CSSProperties = {
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
  

  const mobileStyle = `
    @media (max-width: 768px) {
      textarea {
        width: 100px;
        height: 250px; /* Adjust height for tablets */
      }
    }

    @media (max-width: 480px) {
      textarea {
      width: 100px;
        height: 200px; /* Adjust height for mobile screens */
      }
    }
  `;

  return (
    <div>
      <style>{mobileStyle}</style>
      <textarea
        style={textareaStyle}
        value={editorContent}
        onChange={handleInputChange}
        placeholder="Enter JSON here..."
      />

      {/* Only display error lines with highlights */}
      <div style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
        {editorContent.split("\n").map((line, idx) => (
          // Only render the lines with errors, otherwise display an empty string for non-error lines
          jsonErrorLines.includes(idx) ? (
            <div
              key={idx}
              style={{
                color: "red", // Highlight error lines in red
                backgroundColor: "rgba(255, 0, 0, 0.2)", // Optional: background highlight
                padding: "2px 0",
              }}
            >
              {line}
            </div>
          ) : null
        ))}
      </div>

      {/* Display duplicate ID error */}
      {duplicateIdError && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {duplicateIdError}
        </div>
      )}
    </div>
  );
};

export default JsonEditor;
