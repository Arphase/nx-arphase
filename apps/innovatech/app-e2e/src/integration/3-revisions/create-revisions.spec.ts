import { RevisionStatus, revisionStatusLabels } from '@innovatech/common/domain';

/// <reference types ="cypress"/>

describe('Revisions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('create a vehicle', () => {
    cy.get('[data-cy="email"]').type('victor.martinez@mailinator.com');
    cy.get('[data-cy="password"]').type('Innovatech123@');
    cy.get('[data-cy="sign-in"]').click();

    // Navigate to form
    cy.get('[data-cy="revisions"]').click();
    cy.get('[data-cy="new-revision"]').click();

    // Vehicle form fills automatically
    cy.get('[data-cy="vin"]').type('37289472398473289');

    // Fill revision form
    cy.get('[data-cy="form"]').selectDropdownOptionAndWait({
      inputName: 'status',
      value: revisionStatusLabels[RevisionStatus[RevisionStatus.elegible]],
    });
    cy.get('[data-cy="kilometrage"]').type('10000');
    cy.get('[data-cy="reviewed-by"]').type('Víctor Martínez');
    cy.get('[data-cy="observations"]').type('Test observations');

    cy.get('[data-cy="save"]').click();

    const revisionRow = cy.get('[data-cy="revision-row"]').first();
    revisionRow.get('[data-cy="vin"]').first().should('have.text', '37289472398473289');
    revisionRow.get('[data-cy="brand"]').first().should('have.text', 'Seat');
    revisionRow.get('[data-cy="model"]').first().should('have.text', 'Ibiza');
    revisionRow.get('[data-cy="year"]').first().should('have.text', '2022');
    revisionRow.get('[data-cy="observations"]').first().should('have.text', 'Test observations');
    revisionRow.get('[data-cy="status"]').first().should('have.class', 'anticon-check-circle');
  });
});
