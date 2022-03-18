/// <reference types ="cypress"/>

describe('Assign Products', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('create a product', () => {
    cy.get('[data-cy="email"]').type('victor.martinez@mailinator.com');
    cy.get('[data-cy="password"]').type('Innovatech123@');
    cy.get('[data-cy="sign-in"]').click();

    // Navigate to modal
    cy.get('[data-cy="groups"]').click();
    cy.get('[data-cy="assign-products"]').first().click();
    cy.wait(2000);

    // Transfer product
    cy.get('[data-cy="product-checkbox"]').first().click();
    cy.get('.ant-transfer-operation').within(() => cy.get('.ant-btn-primary').eq(1).click());
    cy.get('.ant-modal-footer').within(() => cy.get('.ant-btn-primary').click());
  });
});
