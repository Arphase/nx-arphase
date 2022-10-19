/// <reference types ="cypress"/>

describe('Assign Products', () => {
  before(() => {
    cy.task('connectToDb');
    cy.task('seed');
    cy.task('seedProduct');
  });

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  after(() => {
    cy.task('clean');
    cy.task('closeDbConnection');
  });
  it('should assign a product', () => {
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
