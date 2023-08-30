describe('Header', () => {
  const pathsToTest = ['/', '/contributors'];
  const headerSelector = 'header';
  const siteLogoSelector = 'header div#siteLogo';
  const siteLogoImageSelector = `${siteLogoSelector} img.logo`;
  const adaptiveLinksSelector = 'div#adaptiveLinks';
  const hamburgerIconSelector = 'nav [data-testid="hamburger-icon"]';

  const siteTitleText = 'Queer Calendar Sheffield';

  const homepageURL = '/'

  pathsToTest.forEach((path) => {
    context(`Testing on ${path}`, () => {
      beforeEach(() => {
        cy.visit(path);
      });

      it(`should load the title and logo`, () => {
        cy.get(headerSelector).should('exist');
        cy.get(headerSelector).contains(siteTitleText);

        cy.get(siteLogoImageSelector)
          .should('exist')
          .should('have.attr', 'src')
          .should('include', 'favicon.ico');
        cy.get(siteLogoImageSelector).should('have.attr', 'alt');
      });

      it(`should take you to the homepage when the logo image is clicked`, () => {
        cy.get(siteLogoImageSelector).click();
        cy.location('pathname').should('eq', homepageURL);
      })

      it(`should take you to the homepage when the site title is clicked`, () => {
        cy.get(siteLogoSelector).contains(siteTitleText);
      })

      context(`desktop view`, () => {
        beforeEach(() => {
          cy.viewport(1080, 1920);
        });

        it(`should NOT show the hamburger icon`, () => {
          cy.get(hamburgerIconSelector).should(`not.be.visible`);
        })

        it(`should show the navigation links`, () => {
          cy.get(adaptiveLinksSelector).should(`be.visible`);
        });
      });

      context(`mobile view`, () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
        })

        it(`should show the hamburger icon`, () => {
          cy.get(hamburgerIconSelector).should(`be.visible`);
        })

        it(`should NOT show the navigation links`, () => {
          cy.get(adaptiveLinksSelector).should(`not.be.visible`);
        });

        it(`should show and hide the navigation links when the hamburger icon is clicked`, () => {
          cy.get(hamburgerIconSelector).click()
          cy.then(() => {
            cy.get(adaptiveLinksSelector).should(`be.visible`);
          });

          cy.get(hamburgerIconSelector).click()
          cy.then(() => {
            cy.get(adaptiveLinksSelector).should(`not.be.visible`);
          });
        });
      });
    });
  });
});
