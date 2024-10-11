import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  //Create a Ref for the Name Input
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (errors.password && passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully!");
      //Clear the form
      setFormData({ name: "", email: "", password: "" });
    }
  };

  return (
    <div>
      <h1>Simple User Form</h1>
      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;