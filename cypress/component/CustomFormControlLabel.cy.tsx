import { CustomCheckbox, CustomFormControlLabel } from '@/components/General';

describe('CustomFormControlLabel', () => {
  // Button label
  const label = 'Remember me';
  const selector = '[data-test-id="form-control-label"]';

  it(`custom form control label should contain '${label}' text`, () => {
    // Mount CustomFormControlLabel component with label prop
    cy.mount(
      <CustomFormControlLabel control={<CustomCheckbox />} label={label} />
    );

    // div with form-control-label test id should contain label variable text
    cy.get(selector).should('contains.text', label);
  });

  it(`custom form control label should contain .Mui-checked when click`, () => {
    // Mount CustomFormControlLabel component with label prop
    cy.mount(
      <CustomFormControlLabel control={<CustomCheckbox />} label={label} />
    );

    // div with form-control-label test id should .Mui-checked when click
    cy.get(`${selector} > label`).click();
    cy.get(`${selector} > label > div > *`).should('have.class', 'Mui-checked');

    // div with form-control-label test id shouldnot .Mui-checked when click again
    cy.get(`${selector} > label`).click();
    cy.get(`${selector} > label > div > *`).should(
      'not.have.class',
      'Mui-checked'
    );
  });
});
