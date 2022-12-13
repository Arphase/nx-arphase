import { RevisionStatus, revisionStatusLabels } from '@innovatech/common/domain';

/// <reference types ="cypress"/>

describe('Revisions', () => {
  before(() => {
    cy.task('connectToDb');
    cy.task('seed');
    cy.task('seedVehicle');
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
    cy.get('[data-cy="revisions"]').click();
    cy.get('[data-cy="new-revision"]').click();

    // Vehicle form fills automatically
    cy.get('[data-cy="vin"]').type('37289472398473289');

    // Fill revision form
    cy.get('[data-cy="form"]').selectDropdownOptionAndWait({
      inputName: 'status',
      value: revisionStatusLabels[RevisionStatus.elegible],
    });
    cy.get('[data-cy="kilometrage"]').type('10000');
    cy.get('[data-cy="reviewed-by"]').type('Víctor Martínez');
    cy.get('[data-cy="observations"]').type('Test observations');

    cy.get('[data-cy="save"]').click();

    cy.get('[data-cy="revision-row"]').first().as('revisionRow');
    cy.get('@revisionRow').get('[data-cy="vin"]').first().should('have.text', '37289472398473289');
    cy.get('@revisionRow').get('[data-cy="brand"]').first().should('have.text', 'Seat');
    cy.get('@revisionRow').get('[data-cy="model"]').first().should('have.text', 'Ibiza');
    cy.get('@revisionRow').get('[data-cy="year"]').first().should('have.text', '2020');
    cy.get('@revisionRow').get('[data-cy="observations"]').first().should('have.text', 'Test observations');
    cy.get('@revisionRow').get('[data-cy="status"]').first().should('have.class', 'anticon-check-circle');
  });
});
