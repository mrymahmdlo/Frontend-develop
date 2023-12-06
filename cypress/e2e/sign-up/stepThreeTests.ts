import passStepOne from './passStepOne';
import passStepTwo from './passStepTwo';

export default function stepThreeTests() {
  context('Render test', () => {
    it('check back component', () => {
      // Pass step one
      passStepOne();
      // Pass step two
      passStepTwo();

      cy.contains('Back to sign up').click();
      cy.getByData('send-email-form').should('exist');
    });
  });

  context('Validation tests', () => {
    it('fill correct email and otp and test password field of step 3', () => {
      // Pass step one
      passStepOne();
      // Pass step two
      passStepTwo();

      // Test small password
      cy.getByData('password-field').find('input').type('fsdfl');
      cy.getByData('submit-btn').click();
      cy.getByData('password-field-container').contains(
        'Password is too small'
      );

      // Test large password
      cy.getByData('password-field').find('input').clear();
      cy.getByData('password-field')
        .find('input')
        .type(
          'fsdfldsfsdfdsfdsfdsfdsfdfdsfdfdsfdfdfdsfdsfdfdsfdsfdsF5fdsfdsfdfdfsfdsf'
        );
      cy.getByData('submit-btn').click();
      cy.getByData('password-field-container').contains('Password is too long');

      // Test space character password
      cy.getByData('password-field').find('input').clear();
      cy.getByData('password-field').find('input').type('fsdfldsF5fs df');
      cy.getByData('submit-btn').click();
      cy.getByData('password-field-container').contains(
        'Password must not contain any spaces'
      );

      // Test at least one uppercase, lowercase, and number.
      cy.getByData('password-field').find('input').clear();
      cy.getByData('password-field').find('input').type('fsdfldsfdf');
      cy.getByData('submit-btn').click();
      cy.getByData('password-field-container').contains(
        'at least one uppercase, lowercase, and number'
      );
    });

    it('fill correct email and otp and test gender field of step 3', () => {
      // Pass step one
      passStepOne();
      // Pass step two
      passStepTwo();

      const genderSelector = '[data-test-id="gender-field"]';
      const selectableSelector = `${genderSelector} [data-test-id="selectable-container"]`;

      // Test male value
      cy.get(selectableSelector).click();
      cy.getByData('male-btn').click();
      cy.getByData('gender-field').find('input').should('have.value', 'Male');

      // Test female value
      cy.get(selectableSelector).click();
      cy.getByData('female-btn').click();
      cy.getByData('gender-field').find('input').should('have.value', 'Female');

      // Test other value
      cy.get(selectableSelector).click();
      cy.getByData('other-btn').click();
      cy.getByData('gender-field').find('input').should('have.value', 'Other');
    });

    it('fill correct email and otp and test date of birth field of step 3', () => {
      // Pass step one
      passStepOne();
      // Pass step two
      passStepTwo();

      // Open modal
      cy.getDouble('date-of-birth-field', 'selectable-container').click();
      // Submit modal
      cy.getByData('date-of-birth-modal').submit();
      // Check value
      cy.getByData('date-of-birth-field')
        .find('input')
        .should('contain.value', 'Aug');
    });

    it('fill correct email and otp and test location field of step 3', () => {
      // Pass step one
      passStepOne();
      // Pass step two
      passStepTwo();

      cy.intercept('GET', '/api/auth/location/?limit=50&offset=0').as(
        'get-locations'
      );

      // Wait for sign up location request
      cy.wait('@get-locations').its('response.statusCode').should('eq', 200);
      // Open location modal
      cy.getDouble('location-field', 'selectable-container').click();
      // Search for Tehran state
      cy.getDouble('location-modal', 'search-container')
        .find('input')
        .type('Tehran');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(3000);
      // Select tehran and confirm it
      cy.getByData('tehran-state').click();
      // Submit form
      cy.getByData('location-modal').submit();
      // Location input must has Tehran value
      cy.getByData('location-field')
        .find('input')
        .should('contain.value', 'Tehran');
    });
  });

  it('fill correct email and otp and test policies', () => {
    // Pass step one
    passStepOne();
    // Pass step two
    passStepTwo();

    cy.intercept('GET', '/api/content/policies/').as('get-policies');

    // Wait for sign up policies request
    cy.wait('@get-policies').its('response.statusCode').should('eq', 200);

    // Test user agreement modal
    cy.getByData('user-agreement-link').click();
    cy.getByData('user-agreement').find('p').should('exist');
    cy.getByData('close-modal').click();

    // Test cookie policy modal
    cy.getByData('cookie-policy-link').click();
    cy.getByData('cookie-policy').find('p').should('exist');
    cy.getByData('close-modal').click();

    // Test privacy policy modal
    cy.getByData('privacy-policy-link').click();
    cy.getByData('privacy-policy').find('p').should('exist');
    cy.getByData('close-modal').click();

    // cy.request('GET', `http://82.115.26.242:30010/api/content/policies/`).then(
    //   (response) => {
    //     const results = response.body.results;

    // Test user agreement modal
    // const userAgreementBody = results.filter(
    //   (item: { body: string; type: string }) => item.type === 'agreement'
    // );
    // cy.get(userAgreementLink).click();
    // cy.get(`${userAgreementModal} div`).should(
    //   'have.html',
    //   userAgreementBody[0].body
    // );
    // cy.get(closeModal).click();
    // );
  });
}
