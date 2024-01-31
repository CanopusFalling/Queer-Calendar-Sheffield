"use server";

import React from "react";

interface ConfirmationEmailProps {
  formData: FormData;
}

const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({ formData }) => {
  return (
    <div className="bg-black text-white p-8">
      <div className="mb-8">
        <img
          src="https://queercalendarsheffield.co.uk/open-graph-banner.webp"
          alt="Banner Logo"
          className="mx-auto"
        />
      </div>

      <div className="max-w-md mx-auto bg-white text-black p-8 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">
          Event Submission Confirmation
        </h1>
        <p>
          Thank you for submitting the event! We'll be in touch when your event
          is up!
        </p>
        <p>You can view the details of the event you submitted below:</p>
        <ul className="list-disc ml-5 mt-4">
          {[...formData.entries()].map(([name, value]) => (
            <li key={name} className="mb-2">
              <strong className="text-brand">{name}:</strong> {value.toString()}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-center">More info here.</p>
      </div>
    </div>
  );
};

export default ConfirmationEmail;
