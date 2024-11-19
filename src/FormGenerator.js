var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import './FormGenerator.css'; // Importing the CSS file
var FormGenerator = function (_a) {
    var schema = _a.schema;
    var _b = useForm(), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
    var _c = useState(null), jsonData = _c[0], setJsonData = _c[1];
    var onSubmit = function (data) {
        var fullSubmission = {
            formTitle: schema.formTitle, // Include form title
            formDescription: schema.formDescription, // Include form description
            formData: data, // Include the rest of the form data
        };
        var json = JSON.stringify(fullSubmission, null, 2);
        setJsonData(json);
        console.log(fullSubmission);
        var blob = new Blob([json], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = "form_submission.json";
        link.click();
        URL.revokeObjectURL(url);
    };
    var handleCopy = function () {
        if (jsonData) {
            navigator.clipboard.writeText(jsonData).then(function () {
                alert("Form JSON copied to clipboard!");
            }).catch(function (err) {
                console.error("Failed to copy JSON: ", err);
            });
        }
    };
    return (_jsx("div", { className: "form-container", children: _jsxs("div", { className: "form-wrapper", children: [_jsx("h1", { className: "form-title", children: schema.formTitle }), _jsx("p", { className: "form-description", children: schema.formDescription }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "form-fields", children: [schema.fields.map(function (field) {
                            var _a, _b;
                            return (_jsxs("div", { className: "form-field", children: [_jsx("label", { className: "form-label", children: field.label }), (field.type === "text" || field.type === "email") && (_jsx("input", __assign({}, register(field.id, {
                                        required: field.required,
                                        pattern: ((_a = field.validation) === null || _a === void 0 ? void 0 : _a.pattern) ? new RegExp(field.validation.pattern) : undefined,
                                    }), { placeholder: field.placeholder, className: "form-input ".concat(errors[field.id] ? 'input-error' : '') }))), field.type === "select" && field.options && (_jsxs("select", __assign({}, register(field.id, { required: field.required }), { className: "form-input ".concat(errors[field.id] ? 'input-error' : ''), children: [_jsx("option", { value: "", children: "Select an option" }), field.options.map(function (option) { return (_jsx("option", { value: option.value, children: option.label }, option.value)); })] }))), field.type === "radio" && field.options && (_jsx("div", { className: "radio-group", children: field.options.map(function (option) { return (_jsxs("div", { className: "radio-option", children: [_jsx("input", __assign({}, register(field.id, { required: field.required }), { type: "radio", value: option.value, className: "radio-input" })), _jsx("label", { className: "radio-label", children: option.label })] }, option.value)); }) })), field.type === 'textarea' && (_jsx("textarea", __assign({}, register(field.id, { required: field.required }), { placeholder: field.placeholder, className: "form-textarea ".concat(errors[field.id] ? 'input-error' : '') }))), errors[field.id] && (_jsx("span", { className: "error-message", children: ((_b = field.validation) === null || _b === void 0 ? void 0 : _b.message) || "This field is required" }))] }, field.id));
                        }), _jsx("button", { type: "submit", className: "submit-button", children: "Submit" })] }), jsonData && (_jsx("div", { className: "json-output", children: _jsx("button", { onClick: handleCopy, className: "copy-button", children: "Copy Form JSON" }) }))] }) }));
};
export default FormGenerator;
