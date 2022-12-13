/// <reference types ="cypress"/>

describe('Auth', async () => {
  before(() => {
    cy.task('connectToDb');
    cy.task('seed');
  });

  beforeEach(() => cy.visit('/'));

  after(() => {
    cy.task('clean');
    cy.task('closeDbConnection');
  });

  it('should login', () => {
    cy.get('[data-cy="email"]').type('victor.martinez@mailinator.com');
    cy.get('[data-cy="password"]').type('Innovatech123@');
    cy.intercept('http://localhost:3333/users*').as('users');
    cy.get('[data-cy="sign-in"]').click();
    cy.location('pathname', { timeout: 10000 }).should('include', '/dashboard');
    cy.wait('@users');
  });
});
