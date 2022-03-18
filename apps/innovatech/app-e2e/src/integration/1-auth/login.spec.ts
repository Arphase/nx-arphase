/// <reference types ="cypress"/>

describe('Auth', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login', () => {
    cy.get('[data-cy="email"]').type('victor.martinez@mailinator.com');
    cy.get('[data-cy="password"]').type('Innovatech123@');
    cy.get('[data-cy="sign-in"]').click();
    cy.url().should('eq', 'http://localhost:4200/spa/dashboard');
  });
});
