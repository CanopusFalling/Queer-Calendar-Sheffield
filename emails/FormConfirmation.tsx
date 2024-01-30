import { Tailwind, Html, Heading, Text } from "@react-email/components";
import * as React from "react";

export default function FormConfirmation(formData: FormData, formName: string) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Html lang="en" dir="ltr">
        <div className="bg-gray-100 p-8 rounded-md shadow-md">
          <Heading className="text-2xl font-bold mb-4">
            Form Submission Confirmation
          </Heading>
          <Text className="mb-4">
            Thank you for submitting the form. Here are the details:
          </Text>

          <ul className="list-disc pl-6 mb-4">
            {[...formData.entries()].map(([name, value]) => (
              <li key={name} className="mb-2">
                <strong className="text-brand">{name}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </Html>
    </Tailwind>
  );
}
