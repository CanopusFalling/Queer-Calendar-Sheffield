"use server";

import React from "react";
import { renderAsync } from "@react-email/render";
import { FormConfirmation } from "@/emails/FormConfirmation";

const zepto_url = process.env.ZEPTO_MAIL_URL;
const zepto_token = process.env.ZEPTO_MAIL_TOKEN;

const event_submission_email = process.env.EVENT_FORM_EMAIL;

export default async function HandleEventSubmission(formData: FormData) {
  console.log(await formDataToHTML(formData));

  if (zepto_token && zepto_url && event_submission_email) {
    await MailEventInfo(formData);
  } else {
    console.log(
      "No Transactional Mail Provider, or provided email, email not sent.",
    );
  }
}

async function formDataToHTML(formData: FormData): Promise<string> {
  const formDataObject: Record<string, any> = {};

  formData.forEach((value, name) => {
    formDataObject[name] = value;
  });

  console.log(formDataObject);

  return renderAsync(
    <FormConfirmation
      title="Event Confirmation"
      description="Thank you for submitting your event!"
      formData={formDataObject}
    />,
    {
      pretty: true,
    },
  );
}

async function MailEventInfo(formData: FormData) {
  const apiUrl = `https://${zepto_url}/v1.1/email`;

  const emailBody = await formDataToHTML(formData);

  const requestBody = {
    from: {
      address: "noreply@queercalendarsheffield.co.uk",
      name: "noreply",
    },
    to: [
      {
        email_address: {
          address: event_submission_email,
          name: "Queer Calendar Sheffield",
        },
      },
    ],
    subject: "Event Form Submitted",
    htmlbody: emailBody,
  };

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: zepto_token as string,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requestBody),
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log("Email sent successfully:", responseData);
  } else {
    console.error("Failed to send email:", response.statusText);
  }
}
