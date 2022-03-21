/// <reference types="cypress" />

describe('Amazon Test', () => {

    it('Api intercept sing in email request.', () => {
        cy.intercept('POST', 'https://www.kufar.by/l/api/login/v2/auth/signin?token_type=user', request => {
            expect(request.body.email).to.be.equal(Cypress.env('email'));
            expect(request.body.password).to.be.equal(Cypress.env('password'));
        }).as('login');

        //API login
        //It's work, but intercept cant catch this request(i don't know why)
        //cy.kufarAPILogin(Cypress.env('email'), Cypress.env('password'));

        //UI login
        cy.kufarLogin(Cypress.env('email'), Cypress.env('password'));
        cy.wait('@login');
        cy.get('@login').then(loginXHR => {
            console.log(loginXHR);
            console.log(loginXHR.request.body.email);
            console.log(loginXHR.request.body.password);
            console.log('Status: ' + loginXHR.response.statusCode);
            console.log(loginXHR.response.body.jwt);
        });
    })

})