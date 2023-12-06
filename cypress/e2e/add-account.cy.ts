// cypress/integration/account.spec.js

describe('Account Creation and Usage', () => {
  it('Creates an account and uses test data', () => {
    // Visit the application
    cy.visit('/demo'); // Update this with the URL of your application

    // Click on the "Add Account" button to open the account creation modal
    cy.contains('Add Account').click();

    // Ensure the account creation modal is visible
    cy.get('[data-testid="add-account-modal"]').should('be.visible');

    // Simulate a successful API call
    cy.intercept('/api/auth/accounts/', {
      fixture: 'validAccounts.json'
    }).as('getAccounts');

    // Wait for the accounts to load
    cy.wait('@getAccounts');

    // Ensure that account items are displayed
    cy.get('[data-testid="account-item"]').should('have.length.above', 0);

    // Click on an account item
    cy.get('[data-testid="account-item"]').first().click();

    // Simulate a successful account change API call
    cy.intercept('/api/auth/refresh/', {
      fixture: 'accountChangeSuccess.json'
    }).as('changeAccount');

    // Wait for the account change API call to complete
    // cy.wait('@changeAccount');

    // Verify that the account was changed (e.g., a blue tick icon is displayed)
    cy.get('[data-testid="blue-tick-icon"]').should('exist');
  });
});
