// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;

    /**
     * search for the input with the passed data-cy, selects the option and wait for a specified route if provided
     * @param inputName - data-cy to look for, the select input
     * @param value - option to be selected
     * @param alias - string or array of strings to wait, usually because it was triggered by the selection
     */
    selectDropdownOptionAndWait(options: {
      inputName: string;
      value: string;
      endpoint?: string | string[];
    }): Cypress.Chainable<Subject>;
  }
}

// Slow down commands
// const COMMAND_DELAY = 0;

// for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
//   Cypress.Commands.overwrite(command, (originalFn, ...args) => {
//     const origVal = originalFn(...args);

//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(origVal);
//       }, COMMAND_DELAY);
//     });
//   });
// }
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});

Cypress.Commands.add('selectDropdownOptionAndWait', { prevSubject: 'element' }, (prevSubject, { inputName, value }) => {
  return cy
    .get(`[data-cy=${inputName}]`)
    .click()
    .root()
    .get('nz-option-container')
    .contains(value)
    .click()
    .then(() => prevSubject);
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
