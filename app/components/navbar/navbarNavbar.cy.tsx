// Commented out for the moment as the testing doesn't work yet.

// import React from 'react'
// import Navbar from './navbar'

// describe('<Navbar />', () => {
//   it('renders successfully', () => {
//     cy.mount(<Navbar />)

//     cy.get('nav').should('exist');
//   });

//   it('toggles navigation when hamburger button is clicked', () => {
//     cy.mount(<Navbar />);
//     cy.get('[data-testid="hamburger-icon"]').click();
//     cy.get('[data-testid="adaptive-links"]').should('be.visible');
//     cy.get('[data-testid="hamburger-icon"]').click();
//     cy.get('[data-testid="adaptive-links"]').should('not.be.visible');
//   });
// })
