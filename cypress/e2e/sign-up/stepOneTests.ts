import passStepOne from './passStepOne';

export default function stepOneTests() {
  const email = `example${new Date().getTime()}@test.com` as const;

  context('Render tests', () => {
    it('content renders', () => {
      cy.contains('Sign up to DGB'); // header of form is rendered
    });

    it('check back component', () => {
      cy.contains('Back to on boarding').click(); // back to page renders and clickable

      cy.location('pathname').should('eq', '/on-boarding'); // url must be on boadring
    });
  });

  context('Validation test', () => {
    it('fill wrong email input and click next', () => {
      cy.getByData('sign-up-email').find('input').should('have.value', '');
      cy.getByData('sign-up-email').find('input').type(email.slice(1, 6));
      cy.getByData('sign-up-email')
        .find('input')
        .should('have.value', email.slice(1, 6));

      cy.getByData('submit-btn').click();

      cy.contains('Email address must be a valid address');
    });

    it('fill correct email input and click next', () => {
      // Pass step one
      const newEamil = passStepOne();

      // Check we are in otp step or not
      cy.getByData('email-confirmation-title').should(
        'have.text',
        'Enter confirmation code'
      );
      cy.getByData('email-confirmation-desc').should('contain.text', newEamil);
    });
  });

  it('get current location request should call', () => {
    cy.intercept('GET', '/api/auth/user-location/').as('get-current-location');

    // Wait for get current location request
    cy.wait('@get-current-location')
      .its('response.statusCode')
      .should('eq', 200);
  });
}
