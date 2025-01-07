import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SocialAuthButtons from "../../Patient/SocialAuthButtons";
import TermsCheckbox from "./TermsCheckbox";
import { validateEmail, validatePassword } from "../../../utils/validation";

const FormSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [registerAs, setRegisterAs] = useState("Doctor");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.pathname === "/auth/patient/signup") {
      setRegisterAs("Patient");
    } else if (location.pathname === "/auth/doctor/signup") {
      setRegisterAs("Doctor");
    }
  }, [location.pathname]);

  const handleRegisterAsChange = (value: string) => {
    setRegisterAs(value);
    if (value === "Patient") {
      navigate("/auth/patient/signup");
    } else {
      navigate("/auth/doctor/signup");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Handle form submission algorithm here
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Create an account</h2>
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">Login</a>
      </p>

      {/* Registration Options */}
      <div className="mt-4">
        <p className="text-sm text-gray-700">Register as</p>
        <div className="flex items-center space-x-2 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="registerAs"
              value="Doctor"
              checked={registerAs === "Doctor"}
              onChange={() => handleRegisterAsChange("Doctor")}
              className="text-blue-500"
            />
            <span className="ml-2 text-gray-700">Doctor</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="registerAs"
              value="Patient"
              checked={registerAs === "Patient"}
              onChange={() => handleRegisterAsChange("Patient")}
              className="text-blue-500"
            />
            <span className="ml-2 text-gray-700">Patient</span>
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex space-x-4 flex-row">
          <input
            type="text"
            name="firstName"
            placeholder="ex: John"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-[#666] border rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="ex: Mutesa"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-[#666] border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="ex: mutesajohn1"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full bg-white p-2 text-[#666] border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full bg-white p-2 text-[#666] border rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-[#666] border rounded-md focus:outline-none focus:border-blue-500"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 cursor-pointer text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}

        <SocialAuthButtons />
        <TermsCheckbox />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default FormSection;
