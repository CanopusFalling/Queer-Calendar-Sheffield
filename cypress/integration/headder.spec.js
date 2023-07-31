// cypress/integration/header.spec.js
describe('Header', () => {
    it('should load the header on the homepage', () => {
      // Visit the homepage
      cy.visit('/');
  
      // Find the header element and assert that it exists
      cy.get('header').should('exist');
  
      // Optionally, you can also assert that the header contains certain text
      cy.get('header').contains('My App');
    });
  });
  