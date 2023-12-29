import React from "react";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-center dark:bg-neutral-700 lg:text-left">
      <div className="p-6">
        <p className="text-center">
          This calendar is built and maintained by{" "}
          <Link className="underline" href="/contributors">
            our contributors
          </Link>
          . You can also get involved below.
        </p>
      </div>

      <div className="bg-white p-4 text-center dark:bg-neutral-600">
        <div className="flex flex-col items-center sm:flex-row sm:justify-center">
          <Link
            className="mr-4 mb-2 sm:mb-0"
            href="mailto:queercalendarsheffield@gmail.com"
          >
            Email Us
          </Link>
          <Link
            className="mr-4 mb-2 sm:mb-0"
            href="https://forms.gle/KE4iZaxnhtfw4RCF7"
          >
            Add An Event
          </Link>
          <Link
            className="mr-4 mb-2 sm:mb-0"
            href="https://github.com/CanopusFalling/Queer-Calendar-Sheffield"
          >
            View Project on GitHub
          </Link>
          <Link className="mr-4 mb-2 sm:mb-0" href="/contributors">
            Project Contributors
          </Link>
          <Link className="mr-4 mb-2 sm:mb-0" href="/accessibility">
            Accessibility Statement
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </footer>
  );
}
