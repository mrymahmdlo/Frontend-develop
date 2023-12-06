// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>;
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
//       dismiss(
//         subject: string,
//         options?: Partial<TypeOptions>
//       ): Chainable<Element>;
//       visit(
//         originalFn: CommandOriginalFn,
//         url: string,
//         options: Partial<VisitOptions>
//       ): Chainable<Element>;
//     }
//   }
// }
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-test-id=${selector}]`);
});

Cypress.Commands.add('getDouble', (s1, s2) => {
  return cy.get(`[data-test-id=${s1}] [data-test-id=${s2}]`);
});

/**
 * NOTE: If you add a custom command, please add types for it.
 * @see https://docs.cypress.io/guides/tooling/typescript-support.html#Types-for-custom-commands
 * */

Cypress.Commands.add('visitAndWaitFor', (pathname, testId) => {
  cy.visit(pathname);
  cy.findByTestId(testId).should('exist').and('be.visible');
});
