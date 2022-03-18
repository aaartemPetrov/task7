/// <reference types="cypress" />

describe('Amazon Test', () => {

    it('Api intercept sing in email request.', () => {
        cy.homePage();
        cy.intercept('POST', 'https://www.amazon.com/ap/signin', request => {
            console.log(request);
        }).as('s');
        cy.amazonLogin(Cypress.env('email'), Cypress.env('password'));
        cy.wait('@s');
        cy.get('@s').then(s => console.log(s));
    })

})