import { useState } from 'react';
import DoctorTable from "../../components/admin/doctorList";
import Header from "../../components/admin/header";
import Sidebar from "../../components/admin/Sidebar";
import SingleDoc from '../../components/admin/SingleDoc';

export default function SingleDoctorPage() {
  const [activeTab, setActiveTab] = useState("Doctors List");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);  // Update the active tab state when a tab is clicked
  };

  return (
    <>
      <div className="flex h-screen z-50">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab}  // Pass activeTab state here
          onTabChange={handleTabChange}  // Pass the function to update active tab
        />

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto ">
          <Header title="Doctor information" />
          <div className="px-5">
            <SingleDoc/>
           
          </div>
        </div>
      </div>
    </>
  );
}
