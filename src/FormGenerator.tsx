import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './FormGenerator.css';  // Importing the CSS file

interface Option {
  value: string;
  label: string;
}

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: Option[];
  validation?: {
    pattern: string;
    message: string;
  };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [jsonData, setJsonData] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    const json = JSON.stringify(data, null, 2);
    setJsonData(json);

    console.log(data);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form_submission.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (jsonData) {
      navigator.clipboard.writeText(jsonData).then(() => {
        alert("Form JSON copied to clipboard!");
      }).catch((err) => {
        console.error("Failed to copy JSON: ", err);
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h1 className="form-title">{schema.formTitle}</h1>
        <p className="form-description">{schema.formDescription}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="form-fields">
          {schema.fields.map((field) => (
            <div key={field.id} className="form-field">
              <label className="form-label">{field.label}</label>

              {(field.type === "text" || field.type === "email") && (
                <input
                  {...register(field.id, {
                    required: field.required,
                    pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                  })}
                  placeholder={field.placeholder}
                  className={`form-input ${errors[field.id] ? 'input-error' : ''}`}
                />
              )}

              {field.type === "select" && field.options && (
                <select
                  {...register(field.id, { required: field.required })}
                  className={`form-input ${errors[field.id] ? 'input-error' : ''}`}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "radio" && field.options && (
                <div className="radio-group">
                  {field.options.map((option) => (
                    <div key={option.value} className="radio-option">
                      <input
                        {...register(field.id, { required: field.required })}
                        type="radio"
                        value={option.value}
                        className="radio-input"
                      />
                      <label className="radio-label">{option.label}</label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === 'textarea' && (
                <textarea
                  {...register(field.id, { required: field.required })}
                  placeholder={field.placeholder}
                  className={`form-textarea ${errors[field.id] ? 'input-error' : ''}`}
                />
              )}

              {errors[field.id] && (
                <span className="error-message">{field.validation?.message || "This field is required"}</span>
              )}
            </div>
          ))}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {jsonData && (
          <div className="json-output">
            <button onClick={handleCopy} className="copy-button">
              Copy Form JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormGenerator;
