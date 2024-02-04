"use server";

import React from "react";
import { FormConfirmation } from "@/emails/FormConfirmation";

import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

const event_submission_email = process.env.EVENT_FORM_EMAIL as string;

export default async function HandleEventSubmission(formData: FormData) {
  console.log(MailEventInfo(formData));
}

async function MailEventInfo(formData: FormData): Promise<boolean> {
  const formDataObject: Record<string, any> = {};

  formData.forEach((value, name) => {
    formDataObject[name] = value;
  });

  const formProps = {
    title: "Thank You For Submitting Your Event!",
    preview:
      "We have recieved your event and will let you know when it's live!",
    description:
      "Thank you for taking the time to tell us about your event. Our team of volenteers will work on getting your event live for you as fast as possible! This may take up to two weeks at the moment, we are usually faster and try to prioritise events happening soon but can't always get them up in time. In the meantime if you have any updates to this event or extra details, just reply to this email and we'll pick it up when we can. You will get a confirmation email when your event is live.",
    formData: formDataObject,
  };

  const state = await resend.emails.send({
    from: "event@notifications.queercalendarsheffield.co.uk",
    to: [
      event_submission_email,
      formData.get("Contact Email")?.toString() as string,
    ],
    subject: "Thank You For Your Event!",
    react: <FormConfirmation {...formProps} />,
  });

  console.log(state);
  return state.error !== null;
}

// async function MailEventInfo(formData: FormData): Promise<boolean> {
//   const apiUrl = `https://${zepto_url}/v1.1/email`;

//   const emailBody = await formDataToHTML(formData);

//   const requestBody = {
//     from: {
//       address: "events@queercalendarsheffield.co.uk",
//       name: "Queer Calendar Sheffield - Events",
//     },
//     to: [
//       {
//         email_address: {
//           address: event_submission_email,
//           name: "Queer Calendar Sheffield",
//         },
//       },
//       {
//         email_address: {
//           address: formData.get("Contact Email")?.toString(),
//         },
//       },
//     ],
//     reply_to: {
//       address: event_submission_email,
//       name: "Queer Calendar Sheffield",
//     },
//     track_clicks: "False",
//     track_opens: "False",
//     subject: "Event Form Submitted",
//     htmlbody: emailBody,
//   };

//   const headers: Record<string, string> = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: zepto_token as string,
//   };

//   const response = await fetch(apiUrl, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify(requestBody),
//   });

//   if (response.ok) {
//     const responseData = await response.json();
//     return true;
//   } else {
//     console.error("Failed to send email:", response.statusText);
//     return false;
//   }
// }
