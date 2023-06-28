import React from 'react';

export const runtime = 'edge';

function HomePage() {
    const htmlContent = `
  <!DOCTYPE html>

  <head>  
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
      <script type='text/javascript' src='js/calendar.js'></script>
  </head>
  
  <div>
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                  <a class="navbar-brand" href="#">Queer Calendar Sheffield</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                      <!-- <ul class="navbar-nav ml-auto">
                          <li class="nav-item">
                              <a class="nav-link" href="#">Home</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#">Events</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#">About</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#">Contact</a>
                          </li>
                      </ul> -->
                  </div>
              </div>
          </nav>
      </header>
  
      <main>
          <section id="calendar-events" class="container my-5">
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="event-card-container">
              </div>
          </section>
      </main>
  
  
  
      <footer class="bg-light text-center py-3">
          <div class="container">
              <p><a href="https://github.com/CanopusFalling/Queer-Calendar-Sheffield">view project on github</a></p>
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