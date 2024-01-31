"use server";

import React from "react";

interface ConfirmationEmailProps {
  formData: FormData;
}

const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({ formData }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      Email Test
    </div>
  );
};

export default ConfirmationEmail;
