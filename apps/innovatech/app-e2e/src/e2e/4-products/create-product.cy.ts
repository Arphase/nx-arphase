/// <reference types ="cypress"/>

describe('Products', () => {
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

  it('create a product', () => {
    // Navigate to form
    cy.get('[data-cy="products"]').click();
    cy.get('[data-cy="new-product"]').click();

    // Fill product form
    cy.get('[data-cy="name"]').type('Product test');
    cy.get('[data-cy="price"]').type('2500');
    cy.get('[data-cy="logo"]').within(() => cy.get('input').attachFile('logo.png'));
    cy.get('[data-cy="min-year"]').type('0');
    cy.get('[data-cy="max-year"]').type('10');
    cy.get('[data-cy="min-hp"]').type('0');
    cy.get('[data-cy="max-hp"]').type('600');
    cy.get('[data-cy="form"]').selectDropdownOptionAndWait({
      inputName: 'glossary',
      value: 'Año del vehículo - {guarantee.vehicle.year}',
    });
    cy.get('[data-cy="save"]').click();

    cy.get('[data-cy="product-row"]').first().as('productRow');
    cy.get('@productRow').get('[data-cy="folio"]').first().should('have.text', '0001');
    cy.get('@productRow').get('[data-cy="name"]').first().should('have.text', 'Product test');
    cy.get('@productRow').get('[data-cy="price"]').first().should('have.text', '$2,500.00');
  });
});
