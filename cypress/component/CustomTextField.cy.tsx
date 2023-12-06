import { CustomTextField } from '@/components/General';

describe('CustomTextField', () => {
  // Text field label
  const label = 'Username';
  const selector = '[data-test-id="custom-text-field"]';

  it(`custom text field should contain '${label}' text`, () => {
    // Mount CustomTextField component with label prop
    cy.mount(<CustomTextField label={label} />);

    // div with custom-text-field test id should contain label variable text
    cy.get(selector).should('contains.text', label);
  });

  it(`custom text field with error message should contain error text`, () => {
    const errorMessage = 'An error';

    // Mount CustomTextField component with label prop
    cy.mount(<CustomTextField label={label} errorMessage={errorMessage} />);

    // div with custom-text-field test id and error message should contain error text
    cy.get(selector).should('contains.text', errorMessage);
  });

  it(`custom text field should focused when clicked`, () => {
    // Mount CustomTextField component with label prop
    cy.mount(<CustomTextField label={label} />);

    // div with custom-text-field test id should focused when clicked
    cy.get(selector).click();
    cy.focused().should('have.class', 'MuiInputBase-input');
  });

  it(`custom text field should has typed text`, () => {
    const username = 'HassanAlavi';

    // Mount CustomTextField component with label prop
    cy.mount(<CustomTextField label={label} />);

    // div with custom-text-field test id should has value
    cy.get(selector).type(username);
    cy.get(`${selector} input`).should('have.value', username);
  });
});
