"use server";

const zepto_url = process.env.ZEPTO_MAIL_URL;
const zepto_token = process.env.ZEPTO_MAIL_TOKEN;

const event_submission_email = process.env.EVENT_FORM_EMAIL;

import FormConfirmation from "@/emails/FormConfirmation";
import { render as reactEmailRender } from "@react-email/render";

export default async function HandleEventSubmission(formData: FormData) {
  console.log(formData);
  console.log(formDataToHTML(formData));

  if (zepto_token && zepto_url && event_submission_email) {
    await MailEventInfo(formData);
  } else {
    console.log(
      "No Transactional Mail Provider, or provided email, email not sent.",
    );
  }
}

function formDataToHTML(formData: FormData): string {
  return reactEmailRender(FormConfirmation(formData, "Add An Event"));
}

async function MailEventInfo(formData: FormData) {
  const apiUrl = `https://${zepto_url}/v1.1/email`; // Adjust the URL according to your API

  const requestBody = {
    from: {
      address: "noreply@queercalendarsheffield.co.uk",
      name: "noreply",
    },
    to: [
      {
        email_address: {
          address: "contact@queercalendarsheffield.co.uk",
          name: "Queer Calendar Sheffield",
        },
      },
    ],
    subject: "Event Form Submitted",
    htmlbody: formDataToHTML(formData),
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
