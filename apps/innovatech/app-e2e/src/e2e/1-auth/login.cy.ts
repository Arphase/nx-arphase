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
    cy.get('[data-cy="sign-in"]').click();
    cy.url().should('eq', 'http://localhost:4200/spa/dashboard');
  });
});
