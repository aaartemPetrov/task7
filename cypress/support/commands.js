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

Cypress.Commands.add('openHomePage', () => {
    cy.visit('/');
})

Cypress.Commands.add('kufarAPILogin', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://www.kufar.by/l/api/login/v2/auth/signin?token_type=user',
        headers: { 'content-type': 'application/json' },
        body: {
            "email": email,
            "password": password,
            "lang": "ru"
        }
    }).then(response => {
        const token = response.body.jwt;
        window.localStorage.setItem('jwtToken', token);

        cy.log('LOGGINED IN !!!! ')
        cy.openHomePage();
    });
})

Cypress.Commands.add('kufarLogin', (email, password) => {
    cy.openHomePage();
    cy.contains('button', 'Войти').click({ force: true });
    cy.get('[data-name="form_login"]').then(form => {
        cy.wrap(form).find('#email').clear().type(email, { force: true });
        cy.wrap(form).find('#password').clear().type(password, { force: true });
        cy.wrap(form).find('button').click({ force: true });
    })
})