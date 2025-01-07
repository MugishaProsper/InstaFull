import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../components/SignUp/Patient/Header";
import StepIndicator from "../../components/SignUp/Patient/StepIndicator";
import { useNavigate } from "react-router";

const StepTwoCompletion: React.FC = () => {
  const [countries, setCountries] = useState<{ name: string; code: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [googleDriveLink, setGoogleDriveLink] = useState("");
  const [category, setCategory] = useState<string>("");
  const [doctorType, setDoctorType] = useState<string>("");
  const navigate = useNavigate();


  const categories = ["Therapy", "Surgery", "Midwifery", "Other"];
  const doctorTypes = {
    Therapy: ["Physiotherapist", "Mental Therapist"],
    Surgery: ["Surgeon", "Orthopedic Surgeon"],
    Midwifery: ["Midwife", "Nurse"],
    Other: [],
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryData = data.map((country: any) => ({
          name: country.name.common,
          code: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : ""),
        }));
        setCountries(countryData);
      })
      .catch((error) => {
        toast.error("Failed to fetch country data!");
        console.error(error);
      });
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setDoctorType("");
  };

  const handleDoctorTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDoctorType(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleGoogleDriveLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleDriveLink(e.target.value);
  };

  const handleFileOrLinkToggle = () => {
    setIsFileUpload(!isFileUpload);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const fullPhoneNumber = selectedCountry + phoneNumber;

    // Simulate form submission
    try {
      if (isFileUpload) {
        if (!file) {
          toast.error("Please upload a file.");
          return;
        }
        toast.success(`File uploaded: ${file.name}`);
      } else {
        if (!googleDriveLink) {
          toast.error("Please provide a Google Drive link.");
          return;
        }
        toast.success(`Google Drive link submitted: ${googleDriveLink}`);
      }

      toast.success(`Phone number submitted: ${fullPhoneNumber}`);
      toast.success(`Category: ${category}, Doctor Type: ${doctorType}`);
    } catch (error) {
      toast.error("Failed to submit the form.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      navigate("/auth/patient/login");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 ">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Header and Image */}
          <div className="flex-1 flex flex-col items-center justify-center mb-14 p-4">
            <div className="p-6">
              <Toaster />
              <div className="flex flex-row space-x-[12rem] items-center justify-center">
                <div className="flex items-center justify-center">
                  <h2 className="text-2xl font-semibold text-blue-600 mb-5">Medical Information</h2>
                </div>
                <div className="flex justify-center items-center">
                  <h2 className="text-2xl font-semibold mb-5"><a href="/dashboard">Skip</a></h2>
                </div>
              </div>

              {/* Form Fields */}
              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                {/* Category Select */}
                <div>
                  <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select your category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Type Select */}
                {category && (
                  <div>
                    <label htmlFor="doctorType" className="block text-sm text-gray-700 mb-2">
                      Select Doctor Type
                    </label>
                    <select
                      id="doctorType"
                      value={doctorType}
                      onChange={handleDoctorTypeChange}
                      className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select Doctor Type</option>
                      {doctorTypes[category]?.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Country Select */}
                <div>
                </div>

                {/* Phone Number Input */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <input
                      id="phone"
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder="Enter your phone number"
                      className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>


                {/* File Upload or Google Drive Link Toggle */}
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 py-4">Upload your Medical License</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="uploadMethod"
                        checked={isFileUpload}
                        onChange={handleFileOrLinkToggle}
                        className="text-blue-500"
                      />
                      <span className="ml-2">Upload from device</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="uploadMethod"
                        checked={!isFileUpload}
                        onChange={handleFileOrLinkToggle}
                        className="text-blue-500"
                      />
                      <span className="ml-2">Google Drive Link</span>
                    </label>
                  </div>
                </div>

                {/* File Upload or Google Drive Link Input */}
                {isFileUpload ? (
                  <div>
                    <input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="googleDriveLink" className="block text-sm text-gray-700 mb-2">
                      Google Drive Link
                    </label>
                    <input
                      id="googleDriveLink"
                      type="url"
                      value={googleDriveLink}
                      onChange={handleGoogleDriveLinkChange}
                      placeholder="Enter Google Drive link"
                      className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
                <label htmlFor="cv" className="block font-semibold text-gray-700">Upload your CV</label>
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full bg-white p-2 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Header and Step Indicator */}
          <div className="flex-1 p-4">
            <Header />
            <StepIndicator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwoCompletion;
