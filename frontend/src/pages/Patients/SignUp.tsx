import React from "react";
import Header from "../../components/SignUp/Patient/Header";
import StepIndicator from "../../components/SignUp/Patient/StepIndicator";
import FormSection from "../../components/SignUp/Patient/FormSection";

const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-lg p-8 ">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Header and Image */}
          <div className="flex-1 flex flex-col items-center justify-center mb-14 p-4 border-r border-gray-200 ">
            <Header />
            <StepIndicator />
          </div>
          {/* Right Section - Form */}
          <div className="flex-1 p-4">
            <FormSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


