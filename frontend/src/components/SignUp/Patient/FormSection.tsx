import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SocialAuthButtons from "../../Patient/SocialAuthButtons";
import TermsCheckbox from "./TermsCheckbox";
import { validateEmail, validatePassword } from "../../../utils/validation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const FormSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [registerAs, setRegisterAs] = useState("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "", gender: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle gender selection and update formData
  const handleSelectedGenderChange = (gender: string) => {
    setSelectedGender(gender);
    setFormData((prevData) => ({
      ...prevData,
      gender,
    }));
  };

  // Handle path-based role initialization
  useEffect(() => {
    if (location.pathname === "/auth/patient/signup") {
      setRegisterAs("Patient");
      setFormData((prevData) => ({
        ...prevData,
        role: "Patient",
      }));
    } else if (location.pathname === "/auth/doctor/signup") {
      setRegisterAs("Doctor");
      setFormData((prevData) => ({
        ...prevData,
        role: "Doctor",
      }));
    }
  }, [location.pathname]);

  // Update role when the user switches registration type
  const handleRegisterAsChange = (value: string) => {
    setRegisterAs(value);
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));
    navigate(value === "Patient" ? "/auth/patient/signup" : "/auth/doctor/signup");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    let valid = true;
  
    const newErrors = { email: "", password: "", gender: "" };
  
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
  
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    if (!selectedGender) {
      newErrors.gender = "Please select your gender.";
      valid = false;
    }
  
    setErrors(newErrors);
  
    if (valid) {
      setIsSubmitting(true);
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", formData);

        if (response.data) {
          toast.success(response.data.message);
        }
      } catch (error: any) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message || "An unexpected error occurred.");
        } else {
          toast.error(error.message || "An error occurred. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
        navigate("/auth/profile/step2");
      }
    }
  };

  return (
    <div className="p-6">
      <Toaster/>
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Create an account</h2>
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
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
              aria-label="Doctor"
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
              aria-label="Patient"
            />
            <span className="ml-2 text-gray-700">Patient</span>
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

        {/* Gender Selection */}
        <div>
          <p className="text-sm text-gray-700 mb-2">Gender</p>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={selectedGender === "male"}
                onChange={() => handleSelectedGenderChange("male")}
                aria-label="Male"
              />
              <span className="ml-2">Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={selectedGender === "female"}
                onChange={() => handleSelectedGenderChange("female")}
                aria-label="Female"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 cursor-pointer text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

        <SocialAuthButtons />
        <TermsCheckbox />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default FormSection;
