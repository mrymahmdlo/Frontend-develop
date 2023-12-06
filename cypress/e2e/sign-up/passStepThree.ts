export default function passStepThree() {
  cy.intercept('GET', '/api/auth/location/?limit=50&offset=0').as(
    'get-locations'
  );

  // Fill password field
  cy.getByData('password-field').type('DGB123');

  // Fill gender field
  cy.getDouble('gender-field', 'selectable-container').click();
  cy.get(`[data-test-id="male-btn"]`).click();
  cy.getByData('gender-field').find('input').should('have.value', 'Male');

  // Fill date of birth field
  cy.getDouble('date-of-birth-field', 'selectable-container').click();
  cy.getByData('date-of-birth-modal').submit();
  cy.getByData('date-of-birth-field')
    .find('input')
    .should('contain.value', 'Aug');

  // Fill location field
  // Wait for sign up location request
  cy.wait('@get-locations').its('response.statusCode').should('eq', 200);
  // Open location modal
  cy.getDouble('location-field', 'selectable-container').click();
  // Search for Tehran state
  cy.getByData('search-container').find('input').type('Tehran');
  // Select tehran and confirm it
  cy.getDouble('location-modal', 'tehran-state').click();
  // Submit form
  cy.getByData('location-modal').submit();
  // Location input must has Tehran value
  cy.getByData('location-field')
    .find('input')
    .should('contain.value', 'Tehran');

  cy.intercept('POST', '/api/auth/signup/detail/', { res: true }).as(
    'send-detail'
  );

  cy.intercept('GET', '/api/content/markets/', {
    statusCode: 200,
    body: {
      results: [
        {
          name: 'crypto'
        },
        {
          name: 'stock'
        },
        {
          name: 'noch'
        },
        {
          name: 'forex'
        },
        {
          name: 'borse'
        },
        {
          name: 'bit'
        }
      ]
    }
  }).as('get-markets');

  cy.getByData('send-user-info').submit();

  // Wait for sign up send detail request
  cy.wait('@send-detail').its('response.statusCode').should('eq', 200);

  // Wait for sign up get markets request
  cy.wait('@get-markets').its('response.statusCode').should('eq', 200);
}
