import React from "react";

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

import {
  BsInstagram,
  BsFacebook,
  BsEnvelopeFill,
  BsGlobe,
} from "react-icons/bs";

export default function Footer() {
  return (
    <footer>
      <Hr />
      <div>
        <Text className="text-center">
          Queer Calendar Sheffield is a volenteer run project, if you'd like to
          get involved reach out at{" "}
          <Link href="mailto:contact@queercalendarsheffield.co.uk">
            contact@queercalendarsheffield.co.uk
          </Link>
        </Text>
      </div>
      <Hr />
      <div className="flex flex-row justify-center gap-4 mt-4">
        <Link
          href="https://queercalendarsheffield.co.uk"
          aria-label="Visit Our Website"
          className="w-8 h-8"
        >
          <BsGlobe
            title="Queer Calendar Sheffield Website"
            className="w-8 h-8"
          />
        </Link>
        <Link
          href="mailto:contact@queercalendarsheffield.co.uk"
          aria-label="Email Us"
          className="w-8 h-8"
        >
          <BsEnvelopeFill
            title="Queer Calendar Sheffield on Instagram"
            className="w-8 h-8"
          />
        </Link>
        <Link
          href="https://www.instagram.com/queercalendarsheffield"
          aria-label="Visit Our Instagram"
          className="w-8 h-8"
        >
          <BsInstagram
            title="Queer Calendar Sheffield on Instagram"
            className="w-8 h-8"
          />
        </Link>
        <Link
          href="https://www.facebook.com/profile.php?id=61555239571680"
          aria-label="Visit Our Facebook"
          className="w-8 h-8"
        >
          <BsFacebook
            title="Queer Calendar Sheffield on Facebook"
            className="w-8 h-8"
          />
        </Link>
      </div>
      <Text className="italic">
        Note: We do our best to protect your privacy when you visit our site,
        especially given the potential for abuse that could come from targeting
        vunerable LGBTQ+ individuals. However we cannot extend this protection
        to the social media platforms we use, for that reason if you don't want
        your use of our calendar to be known we'd suggest you avoid visiting our
        social media or engaging with our content there.
      </Text>
    </footer>
  );
}
