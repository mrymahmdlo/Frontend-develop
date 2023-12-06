import { CustomCheckbox } from '@/components/General';

describe('CustomCheckbox', () => {
  const selector = '[data-test-id="checkbox"]';

  it(`custom checkbox should contain .Mui-checked when click`, () => {
    // Mount CustomCheckbox component
    cy.mount(<CustomCheckbox />);

    // div with checkbox test id should .Mui-checked when click
    cy.get(`${selector} > .MuiButtonBase-root`).click();
    cy.get(`${selector} > .MuiButtonBase-root`).should(
      'have.class',
      'Mui-checked'
    );

    // div with checkbox test id shouldnot .Mui-checked when click again
    cy.get(`${selector} > .MuiButtonBase-root`).click();
    cy.get(`${selector} > .MuiButtonBase-root`).should(
      'not.have.class',
      'Mui-checked'
    );
  });
});
