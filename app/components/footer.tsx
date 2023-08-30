import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
      <div className="p-6 text-neutral-800 dark:text-neutral-200">
        <p className="text-center">
          This calendar is built and maintained by <a className="underline" href="/contributors">our contributors</a>. You can also get involved below.
        </p>
      </div>

      <div className="bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        <div className="flex flex-col items-center sm:flex-row sm:justify-center">
          <a className="mr-4 mb-2 sm:mb-0" href="mailto:queercalendarsheffield@gmail.com">Email Us</a>
          <a className="mr-4 mb-2 sm:mb-0" href="https://forms.gle/KE4iZaxnhtfw4RCF7">Add An Event</a>
          <a className="mr-4 mb-2 sm:mb-0" href="https://github.com/CanopusFalling/Queer-Calendar-Sheffield">View Project on GitHub</a>
          <a className="mr-4 mb-2 sm:mb-0" href="/contributors">Project Contributors</a>
          {/* Add more links as needed */}
        </div>
      </div>
    </footer>
  );
}
