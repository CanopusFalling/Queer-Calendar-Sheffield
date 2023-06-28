import React from 'react';

export const runtime = 'edge';

function HomePage() {
    const htmlContent = `
  <!DOCTYPE html>

  <head>  
      <script type='text/javascript' src='js/calendar.js'></script>
  </head>
  
  <header>
    <nav class="bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <a class="text-white text-lg font-bold" href="#">Queer Calendar Sheffield</a>
          <button class="text-white inline-flex p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
            aria-label="Toggle navigation">
            <svg class="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <section id="calendar-events" class="container my-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="event-card-container">
      </div>
    </section>
  </main>

  <footer class="bg-gray-100 py-3">
    <div class="container mx-auto px-4">
      <p><a href="https://github.com/CanopusFalling/Queer-Calendar-Sheffield">View project on GitHub</a></p>
    </div>
  </footer>

  <!-- Modals -->
  <div id="event-modal-container">
  </div>
  </div>
  `;

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default HomePage;