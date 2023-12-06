import AuthProviderBtns from '@/components/General/AuthProviderBtns';
import messages from '@/lib/i18n/messages/en.json';

describe('AuthProviderBtns', () => {
  // Test buttons that has no label and just has icon
  function withoutLabelBtns() {
    // button#meta-btn should not contains any text
    cy.get('button#meta-btn')
      .should('not.contain.text')
      .should('contain.html', 'svg');
    // button#twitter-btn should not contains any tex
    cy.get('button#twitter-btn')
      .should('not.contain.text')
      .should('contain.html', 'svg');
    // button#linkedIn-btn should not contains any tex
    cy.get('button#linkedIn-btn')
      .should('not.contain.text')
      .should('contain.html', 'svg');
  }

  it('without type prop', () => {
    // AuthProviderBtns should mount without any prop
    cy.mount(<AuthProviderBtns />);

    // button#apple-btn should contains desired text
    cy.get('button#apple-btn').should(
      'contains.text',
      messages['Continue with apple']
    );
    // button#google-btn should contains desired text
    cy.get('button#google-btn').should(
      'contains.text',
      messages['Continue with google']
    );

    withoutLabelBtns();
  });

  it('with sign-up type prop', () => {
    // AuthProviderBtns should mount with type prop
    cy.mount(<AuthProviderBtns type='sing-up' />);

    // button#apple-btn should contains desired text
    cy.get('button#apple-btn').should(
      'contains.text',
      messages['Sign up with apple']
    );
    // button#google-btn should contains desired text
    cy.get('button#google-btn').should(
      'contains.text',
      messages['Sign up with google']
    );

    withoutLabelBtns();
  });

  it('with log in type prop', () => {
    // AuthProviderBtns should mount with type prop
    cy.mount(<AuthProviderBtns type='log-in' />);

    // button#apple-btn should contains desired text
    cy.get('button#apple-btn').should(
      'contains.text',
      messages['Log in with apple']
    );
    // button#google-btn should contains desired text
    cy.get('button#google-btn').should(
      'contains.text',
      messages['Log in with google']
    );

    withoutLabelBtns();
  });
});
