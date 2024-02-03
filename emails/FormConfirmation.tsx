import * as React from "react";
import {
  Tailwind,
  Html,
  Head,
  Container,
  Heading,
  Hr,
  Text,
  Link,
  Body,
  Img,
  Preview,
} from "@react-email/components";

import Footer from "./components/footer";

interface FormConfirmationProps {
  title: string;
  preview: string;
  description: string;
  formData: Record<string, any>;
}

export function FormConfirmation({
  title,
  preview,
  description,
  formData,
}: FormConfirmationProps) {
  return (
    <Html lang="en-GB" dir="ltr">
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                sans: ["OpenSans", "Arial", "sans-serif"],
              },
            },
          },
        }}
      >
        <Body className="bg-neutral-800 font-sans">
          <Head>
            <title>{title}</title>
          </Head>
          <Preview>{preview}</Preview>
          <Container className="max-w-screen-md bg-black rounded-xl p-10 text-white">
            <Img
              src="https://queercalendarsheffield.co.uk/icon/128.webp"
              alt="Queer Calendar Sheffield Logo"
              className="h-20 mx-auto mb-6"
            />
            <Heading as="h1" className="text-xxl m-0 mb-4 text-center">
              {title}
            </Heading>
            <Hr />
            <Text>{description}</Text>
            <Hr />
            <section>
              <Heading as="h2" className="text-xl m-0">
                Event Details Submitted
              </Heading>
              <ul className="list-disc ml-5 mt-4">
                {Object.entries(formData).map(([key, value]) =>
                  value ? (
                    <li key={key} className="mb-2">
                      <strong className="text-brand">{key}:</strong>{" "}
                      {value.toString()}
                    </li>
                  ) : (
                    <></>
                  ),
                )}
              </ul>
            </section>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

FormConfirmation.PreviewProps = {
  title: "Thank You For Submitting Your Event!",
  preview: "We have recieved your event and will let you know when it's live!",
  description:
    "Success! Thank you for taking the time to tell us about your event. Our team of volenteers will work on getting your event live for you as fast as possible! This may take up to two weeks at the moment, we are usually faster and try to prioritise events happening soon but can't always get them up in time. In the meantime if you have any updates to this event or extra details, just reply to this email and we'll pick it up when we can. \n You will get a confirmation email when your event is live.",
  formData: {
    Title: "Bouldering @ Climbing Hangar",
    Description: "Come Join us climbing the wall at The Climbing Hangar",
    "Start DateTime": "2024-01-01:10:00:00",
    "Your Contact Email": "test@test.com",
  },
};

export default FormConfirmation;
