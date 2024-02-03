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

import { BsInstagram, BsFacebook, BsEnvelopeFill } from "react-icons/bs";

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

            <Hr />
            <section className="flex flex-row justify-center gap-4 mt-4">
              <Link
                href="mailto:contact@queercalendarsheffield.co.uk"
                className="w-8 h-8"
              >
                <BsEnvelopeFill
                  title="Queer Calendar Sheffield on Instagram"
                  className="w-8 h-8"
                />
              </Link>
              <Link
                href="https://www.instagram.com/queercalendarsheffield"
                className="w-8 h-8"
              >
                <BsInstagram
                  title="Queer Calendar Sheffield on Instagram"
                  className="w-8 h-8"
                />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61555239571680"
                className="w-8 h-8"
              >
                <BsFacebook
                  title="Queer Calendar Sheffield on Facebook"
                  className="w-8 h-8"
                />
              </Link>
            </section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

FormConfirmation.PreviewProps = {
  title: "Thank You For Submitting Your Event!",
  preview: "We have recieved your event and will let you know when it's live!",
  description: "Thank you for submitting your event!",
  formData: {
    Title: "Bouldering @ Climbing Hangar",
    Description: "Come Join us climbing the wall at The Climbing Hangar",
    "Start DateTime": "2024-01-01:10:00:00",
    "Your Contact Email": "test@test.com",
  },
};

export default FormConfirmation;
