/// <reference types ="cypress"/>

describe('Vehicles', () => {
  before(() => {
    cy.task('connectToDb');
    cy.task('seed');
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  after(() => {
    cy.task('clean');
    cy.task('closeDbConnection');
  });

  it('should create an item', () => {
    cy.get('[data-cy="vehicles"]').click();
    cy.get('[data-cy="new-vehicle"]').click();

    cy.get('[data-cy="vin"]').type('37289472398473289');
    cy.get('[data-cy="motor-number"]').type('37289472398473289');
    cy.get('[data-cy="brand"]').type('Seat');
    cy.get('[data-cy="model"]').type('Ibiza');
    cy.get('[data-cy="version"]').type('Style');
    cy.get('[data-cy="year"]').type('2022');
    cy.get('[data-cy="horse-power"]').type('300');

    cy.get('[data-cy="save"]').click();

    cy.get('[data-cy="vehicle-row"]').first().as('vehicleRow');
    cy.get('@vehicleRow').get('[data-cy="vin"]').first().should('have.text', '37289472398473289');
    cy.get('@vehicleRow').get('[data-cy="business-name"]').first().should('have.text', 'test');
    cy.get('@vehicleRow').get('[data-cy="brand"]').first().should('have.text', 'Seat');
    cy.get('@vehicleRow').get('[data-cy="model"]').first().should('have.text', 'Ibiza');
    cy.get('@vehicleRow').get('[data-cy="year"]').first().should('have.text', '2022');
    cy.get('@vehicleRow').get('[data-cy="status"]').first().should('have.class', 'anticon-exclamation-circle');
  });
});
