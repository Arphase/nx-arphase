/// <reference types ="cypress"/>

describe('Guarantees', () => {
  before(() => {
    cy.task('connectToDb');
    cy.task('seed');
    cy.task('seedLocalities');
    cy.task('seedProduct');
    cy.task('seedVehicle');
    cy.task('seedAssignedProduct');
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
    // Navigate to form
    cy.get('[data-cy="guarantees"]').click();
    cy.get('[data-cy="new-guarantee"]').click();

    // Vehicle form fills automatically
    cy.get('[data-cy="vin"]').type('37289472398473289');

    // Fill guarantee form
    cy.get('[data-cy="start-date"]').type('2022-03-22');
    cy.get('[data-cy="end-date"]').type('2023-03-22');
    cy.get('[data-cy="kilometrage-start"]').type('100000');
    cy.get('[data-cy="kilometrage-end"]').type('200000');
    cy.get('[data-cy="form"]').selectDropdownOptionAndWait({
      inputName: 'company',
      value: 'test',
    });
    cy.get('[data-cy="form"]').selectDropdownOptionAndWait({
      inputName: 'product',
      value: 'Product',
    });
    cy.get('[data-cy="person-type-physical"]').click();
    cy.get('[data-cy="sales-place"]').type('Punto de venta prueba');
    cy.get('[data-cy="name"]').type('Víctor');
    cy.get('[data-cy="last-name"]').type('Martínez');
    cy.get('[data-cy="second-last-name"]').type('Valdés');
    cy.get('[data-cy="birth-date"]').type('2023-03-22');
    cy.get('[data-cy="rfc"]').type('MAVV951102311');
    cy.get('[data-cy="phone"]').type('8112341234');
    cy.get('[data-cy="email"]').type('victor@test.com');
    cy.get('[data-cy="zipcode"]').type('64983');
    cy.get('[data-cy="suburb"]').type('Test');
    cy.get('[data-cy="street"]').type('Test');
    cy.get('[data-cy="external-number"]').type('10');
    cy.get('[data-cy="internal-number"]').type('B');

    cy.get('[data-cy="save"]').click();

    const guaranteeRow = cy.get('[data-cy="guarantee-row"]').first();
    guaranteeRow.get('[data-cy="folio"]').first().should('have.text', '0001');
    guaranteeRow.get('[data-cy="vin"]').first().should('have.text', '37289472398473289');
    guaranteeRow.get('[data-cy="business-name"]').first().should('have.text', 'test');
    guaranteeRow.get('[data-cy="invoice-number"]').first().should('have.text', 'N/A');
    guaranteeRow.get('[data-cy="amount"]').first().should('have.text', 'N/A');
    guaranteeRow.get('[data-cy="status"]').first().should('have.class', 'anticon-exclamation-circle');
  });
});
