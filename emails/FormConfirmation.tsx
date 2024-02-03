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
} from "@react-email/components";

import { BsInstagram, BsFacebook, BsEnvelopeFill } from "react-icons/bs";

export function FormConfirmation() {
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
            <title>Event Submission Confirmation</title>
          </Head>
          <Container className="max-w-screen-md bg-black rounded-xl p-10 text-white">
            <Heading as="h1" className="text-xxl m-0">
              Event Submission Confirmation
            </Heading>
            <Hr />
            <Text>
              Thank you for submitting your event! We'll be in touch when we add
              your event. We will also be in contact if we need more information
              or if we are unable to add the event to the calendar.
            </Text>
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

export default FormConfirmation;
