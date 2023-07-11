import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
      <div className="container p-6 text-neutral-800 dark:text-neutral-200">
        <div className="mb-6 md:mb-0">
          <p className="text-center">
            This website is built entirely by volenteers to advertise local queer events in Sheffield.
          </p>
        </div>
      </div>

      <div className="bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        <div className="flex justify-center">
          <a className="mr-4" href="email:queercalendarsheffield@gmail.com">Email Us</a>
          <a className="mr-4" href="https://forms.gle/KE4iZaxnhtfw4RCF7">Add An Event</a>
          <a className="mr-4" href="https://github.com/CanopusFalling/Queer-Calendar-Sheffield">View Project on Github</a>
          {/* Add more links as needed */}
        </div>
      </div>
    </footer>
  );
}
