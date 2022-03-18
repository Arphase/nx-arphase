/// <reference types ="cypress"/>

describe('Products', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('create a product', () => {
    cy.get('[data-cy="email"]').type('victor.martinez@mailinator.com');
    cy.get('[data-cy="password"]').type('Innovatech123@');
    cy.get('[data-cy="sign-in"]').click();

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

    const productRow = cy.get('[data-cy="product-row"]').first();
    productRow.get('[data-cy="folio"]').first().should('have.text', '0001');
    productRow.get('[data-cy="name"]').first().should('have.text', 'Product test');
    productRow.get('[data-cy="price"]').first().should('have.text', '$2,500.00');
  });
});
