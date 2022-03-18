// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('homePage', () => {
    cy.visit('/');
})

Cypress.Commands.add('amazonLogin', (email, password) => {
    cy.homePage();
    cy.get('#nav-link-accountList').trigger('mouseover');
    cy.contains('a', 'Sign in').click();
    cy.get('#ap_email').clear().type(email);
    cy.get('#continue').click();
    cy.get('#ap_password').clear().type(password);
    cy.get('#signInSubmit').click();
    cy.get('#nav-item-signout').should('contain', 'Sign Out');
    cy.log('LOGINNED IN!!!')
})