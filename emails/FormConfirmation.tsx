import * as React from "react";
import {
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
      <style>{TEMP_TAILWIND_STYLES}</style>
      <Body className="bg-neutral-800 font-sans text-white">
        <Head>
          <title>{title}</title>
        </Head>
        <Preview>{preview}</Preview>
        <Container className="max-w-screen-md bg-black rounded-xl p-10">
          <Img
            src="https://queercalendarsheffield.co.uk/icon/128.webp"
            alt="Queer Calendar Sheffield Logo"
            className="h-20 mx-auto mb-6"
          />
          <Heading as="h1" className="text-3xl m-0 mb-4 text-center">
            {title}
          </Heading>
          <Hr />
          <Text>{description}</Text>
          <Hr />
          <section>
            <Heading as="h2" className="text-xl m-0">
              Information Submitted
            </Heading>
            <div className="my-4">
              {Object.entries(formData).map(([key, value]) =>
                value ? (
                  <div className="mb-4">
                    <label className="block font-bold mb-1 ml-2">{key}</label>
                    <div className="bg-neutral-800 border-solid border border-neutral-600 p-2 rounded-md">
                      <span className="">{value}</span>
                    </div>
                  </div>
                ) : (
                  <></>
                ),
              )}
            </div>
          </section>
          <Footer />
        </Container>
      </Body>
    </Html>
  );
}

const TEMP_TAILWIND_STYLES = `
.bg-neutral-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(38 38 38 / var(--tw-bg-opacity));
}

.font-sans {
  font-family: Roboto, sans-serif;
}

.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.max-w-screen-md {
  max-width: 768px;
}

.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
}

.rounded-xl {
  border-radius: 0.75rem/* 12px */;
}

.p-10 {
  padding: 2.5rem/* 40px */;
}

.h-20 {
  height: 5rem/* 80px */;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-6 {
  margin-bottom: 1.5rem/* 24px */;
}

.text-2xl {
  font-size: 1.5rem/* 24px */;
  line-height: 2rem/* 32px */;
}

.text-3xl {
  font-size: 1.875rem/* 30px */;
  line-height: 2.25rem/* 36px */;
}

.m-0 {
  margin: 0px;
}

.mb-4 {
  margin-bottom: 1rem/* 16px */;
}

.text-center {
  text-align: center;
}

.text-xl {
  font-size: 1.25rem/* 20px */;
  line-height: 1.75rem/* 28px */;
}

.my-4 {
  margin-top: 1rem/* 16px */;
  margin-bottom: 1rem/* 16px */;
}

.block {
  display: block;
}

.font-bold {
  font-weight: 700;
}

.mb-1 {
  margin-bottom: 0.25rem/* 4px */;
}

.border-solid {
  border-style: solid;
}

.border {
  border-width: 1px;
}

.border-neutral-600 {
  --tw-border-opacity: 1;
  border-color: rgb(82 82 82 / var(--tw-border-opacity));
}

.p-2 {
  padding: 0.5rem/* 8px */;
}

.rounded-md {
  border-radius: 0.375rem/* 6px */;
}`;

FormConfirmation.PreviewProps = {
  title: "Thank You For Submitting Your Event!",
  preview: "We have recieved your event and will let you know when it's live!",
  description:
    "Thank you for taking the time to tell us about your event. Our team of volenteers will work on getting your event live for you as fast as possible! This may take up to two weeks at the moment, we are usually faster and try to prioritise events happening soon but can't always get them up in time. In the meantime if you have any updates to this event or extra details, just reply to this email and we'll pick it up when we can. You will get a confirmation email when your event is live.",
  formData: {
    Title: "Bouldering @ Climbing Hangar",
    Description: "Come Join us climbing the wall at The Climbing Hangar",
    "Start DateTime": "2024-01-01:10:00:00",
    "Your Contact Email": "test@test.com",
  },
};

export default FormConfirmation;
