"use server";

import React from "react";
import { FormConfirmation } from "@/emails/FormConfirmation";

import { Resend } from "resend";
import { redirect } from "next/navigation";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const EVENT_FORM_EMAIL = process.env.EVENT_FORM_EMAIL;

export default async function HandleEventSubmission(
  currentState: React.FormEvent,
  formData: FormData,
) {
  const eventSubmitted = await MailEventInfo(formData);

  if (eventSubmitted) {
    redirect("/add-an-event?success=true");
    return {
      message:
        "Event Successfully Submitted! You Should Recieve A Confirmation Email Soon, Remember To Check Your Spam.",
      success: true,
    };
  } else {
    return {
      message: `Failed To Submit Event! You Can Send Us Your Event At ${EVENT_FORM_EMAIL} Instead.`,
      success: false,
    };
  }
}

async function MailEventInfo(formData: FormData): Promise<boolean> {
  if (RESEND_API_KEY == undefined) {
    console.log("Missing Resend API Key");
    return false;
  }

  if (EVENT_FORM_EMAIL == undefined) {
    console.log("Missing Event Form Email");
    return false;
  }

  const resend = new Resend(RESEND_API_KEY);
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

  let sendTo: string[] = [
    formData.get("Contact Email")?.toString() as string,
    EVENT_FORM_EMAIL,
  ];

  const state = await resend.emails.send({
    from: "event@notifications.queercalendarsheffield.co.uk",
    to: sendTo,
    subject: "Thank You For Your Event!",
    react: <FormConfirmation {...formProps} />,
    reply_to: EVENT_FORM_EMAIL,
  });

  console.log(state);
  return state.error == null;
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
