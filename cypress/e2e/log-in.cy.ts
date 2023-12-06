/* eslint-disable camelcase */
describe('Demo Page', () => {
  const accounts = [
    {
      full_name: 'Test User 1',
      avatar: 'test_avatar_1.jpg',
      token: 'test_token_1'
    },
    {
      full_name: 'Test User 2',
      avatar: 'test_avatar_2.jpg',
      token: 'test_token_2'
    }
    // Add more test account data as needed
  ];

  beforeEach(() => {
    // Visit the Demo page before each test
    cy.visit('/demo'); // Update the URL as needed
  });

  it('displays the "Add Account" button', () => {
    cy.get('button:contains("Add Account")').should('exist');
  });

  it('opens the Add Account modal when the "Add Account" button is clicked', () => {
    cy.get('button:contains("Add Account")').click();
    cy.get('div[role="dialog"]').should('be.visible');
  });

  it('closes the Add Account modal when the "Close" button is clicked', () => {
    cy.get('button:contains("Add Account")').click();
    cy.get('button:contains("Close")').click();
    cy.get('div[role="dialog"]').should('not.be.visible');
  });

  it('adds accounts and tests <AddNewAccount />', () => {
    cy.get('button:contains("Add Account")').click();
    cy.get('div[role="dialog"]').should('be.visible');

    // Loop through the predefined account data and add them
    accounts.forEach((account) => {
      cy.get('input[name="full_name"]').should('exist').type(account.full_name);
      cy.get('input[name="avatar"]').should('exist').type(account.avatar);
      cy.get('input[name="token"]').should('exist').type(account.token);

      // Click the "Save" or submit button to add the account (replace with actual selector)
      cy.get('button:contains("Save")').should('exist').click();

      // Verify that the added account is displayed on the page
      cy.get('div.account-card:contains("' + account.full_name + '")').should(
        'exist'
      );

      // Close the modal
      cy.get('button:contains("Close")').should('exist').click();
      cy.get('div[role="dialog"]').should('not.be.visible');

      // Re-open the "Add Account" modal for the next account (if any)
      cy.get('button:contains("Add Account")').should('exist').click();
      cy.get('div[role="dialog"]').should('be.visible');
    });

    // Test the <AddNewAccount /> component
    cy.get('button:contains("Add New Account")').should('exist').click();
    cy.get('div[role="dialog"]').should('be.visible');
    // Write tests for the behavior of the <AddNewAccount /> component.

    // Close the modal
    cy.get('button:contains("Close")').should('exist').click();
    cy.get('div[role="dialog"]').should('not.be.visible');
  });

  // You can add more tests based on your specific use cases
});
